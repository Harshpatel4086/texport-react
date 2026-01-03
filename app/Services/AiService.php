<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AiService
{
    protected $apiKey;
    protected $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key') ?? env('GEMINI_API_KEY');
    }

    public function ask($question, $userId)
    {
        if (!$this->apiKey) {
            return [
                'type' => 'error',
                'message' => 'Gemini API Key is missing. Please configure GEMINI_API_KEY in your .env file.'
            ];
        }

        try {
            // 1. Get the system prompt with schema
            $systemPrompt = $this->getSystemPrompt($userId);

            // 2. Call Gemini to translate Question -> SQL
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($this->baseUrl . '?key=' . $this->apiKey, [
                'contents' => [
                    [
                        'role' => 'user',
                        'parts' => [
                            ['text' => $systemPrompt . "\n\nUser Question: " . $question]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.1, // Low temperature for precise SQL
                ]
            ]);

            // ... (rest of the method logic)
            if ($response->failed()) {
                Log::error('Gemini API Error', $response->json());
                return ['type' => 'error', 'message' => 'Failed to reach AI service.'];
            }

             $aiResponseText = $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? '';
            
            // Clean up the response to extract SQL or Answer
            return $this->processAiResponse($aiResponseText, $question);

        } catch (\Exception $e) {
            Log::error('AI Service Exception: ' . $e->getMessage());
            return ['type' => 'error', 'message' => 'Something went wrong processing your request.'];
        }
    }

    protected function getSystemPrompt($userId)
    {
        return <<<EOT
You are an AI Database Assistant for a Textile Management System.
Your job is to translate user questions into SQL queries (MySQL).

The Current User ID is: {$userId}

DATABASE SCHEMA:

1. users (id, name, email)

2. parties (id, party_name, gst_number, phone_number, business_name, created_by)
   - 'created_by' is the User ID.

3. stocks (id, user_id, date, total_meters)
   - 'user_id' is the User ID.

4. challans (id, challan_number, party_id, total_meter, total_lots, date, created_by, quality_id)
   - 'created_by' is the User ID.
   - 'party_id' links to parties.id

5. invoices (id, invoice_number, challan_id, party_id, total_meter, final_amount, status, date, created_by)
   - 'created_by' is the User ID.
   - 'party_id' links to parties.id
   - 'status' usually 'paid', 'unpaid', 'pending'

6. workers (id, user_id, name, phone)
   - 'user_id' is the User ID.

7. machines (id, user_id, number, description)
   - 'user_id' is the User ID.
   - 'number' is the machine number/name.

8. payslips (id, user_id, worker_id, date_from, date_to, total_salary, total_meters)
   - 'user_id' is the User ID.
   - Represents "Worker Salary".

RULES & RESTRICTIONS:
1. **CRITICAL AUTHENTICATION RULE**: You MUST ALWAYS filter data by the Current User ID ({$userId}).
   - For 'parties', 'challans', 'invoices' -> add `WHERE created_by = {$userId}`
   - For 'stocks', 'workers', 'machines', 'payslips' -> add `WHERE user_id = {$userId}`
   - If querying a JOIN, ensure the main table is filtered by this ID.
   - failure to include this filter is a security violation.

2. RESTRICTION: You are ONLY allowed to write SELECT queries. NEVER write INSERT, UPDATE, DELETE, DROP.
3. If the user asks for a general summary start response with "ANSWER:".
4. If asked for data, output ONLY the raw SQL query.
5. If impossible to answer, reply "ANSWER: I cannot answer that with current data."
6. Always limit results to 50 unless specified otherwise.
7. Return purely valid SQL without markdown.

Examples:
User: "How many parties do I have?"
AI: SELECT COUNT(*) as count FROM parties WHERE created_by = {$userId}

User: "Show me my top 5 invoices"
AI: SELECT * FROM invoices WHERE created_by = {$userId} ORDER BY final_amount DESC LIMIT 5

User: "Calculate total salary of workers"
AI: SELECT SUM(total_salary) as total_salary FROM payslips WHERE user_id = {$userId}
EOT;
    }

    protected function processAiResponse($text, $userQuestion)
    {
        $text = trim($text);

        // Check if it's a direct answer (not SQL)
        if (str_starts_with($text, 'ANSWER:')) {
            return [
                'type' => 'text',
                'content' => trim(str_replace('ANSWER:', '', $text))
            ];
        }

        // Extract SQL block if present
        if (preg_match('/```sql\s*(.*?)\s*```/s', $text, $matches)) {
            $sql = $matches[1];
        } else {
            // Assume the whole text matches if it looks like select
            if (stripos($text, 'SELECT') === 0) {
                $sql = $text;
            } else {
                 return [
                    'type' => 'text',
                    'content' => $text 
                ];
            }
        }

        // SAFETY CHECK
        if (stripos($sql, 'DELETE') !== false || stripos($sql, 'UPDATE') !== false || stripos($sql, 'INSERT') !== false || stripos($sql, 'DROP') !== false || stripos($sql, 'ALTER') !== false) {
             return [
                'type' => 'error',
                'message' => 'Safety violation: AI attempted to modify data. Query blocked.'
            ];
        }

        // Execute Query
        try {
            $results = DB::select($sql);
            
            // DOUBLE PASS: SUMMARIZATION
            // If we have results, ask AI to summarize them in natural language
            $summary = $this->summarizeResults($userQuestion, $results);

            return [
                'type' => 'table_with_summary', // Frontend will handle this new type
                'query' => $sql,
                'content' => $results,
                'summary' => $summary
            ];

        } catch (\Exception $e) {
            return [
                'type' => 'error',
                'message' => 'Could not execute the generated query. Error: ' . $e->getMessage()
            ];
        }
    }

    protected function summarizeResults($question, $data)
    {
        // Limit data sent to AI to avoid huge tokens
        $dataPreview = json_encode(array_slice($data, 0, 20)); 
        $count = count($data);

        $prompt = <<<EOT
User Question: "{$question}"
Database Data: {$dataPreview}
Total Rows: {$count}

Task: Answer the User Question in natural language based on the Database Data.
Rules:
1. Respond in the SAME LANGUAGE as the User Question.
2. Be friendly and professional. Start with "In TexPort Platform..."
3. If it is a count/single value, state it clearly (e.g. "You have 5 parties").
4. If it is a list, briefly mention key items (e.g. "Here are the top results...") and mention I will show the table below.
5. Do NOT output Markdown or SQL. Just plain text.
EOT;

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($this->baseUrl . '?key=' . $this->apiKey, [
                'contents' => [
                    [
                        'role' => 'user',
                        'parts' => [['text' => $prompt]]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.7, // Higher temp for natural language
                ]
            ]);
            
            return $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? 'Here is the data you requested.';
        } catch (\Exception $e) {
            return 'Here is the data you requested.';
        }
    }

}
