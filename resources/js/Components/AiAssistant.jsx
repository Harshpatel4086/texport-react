import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { usePage } from '@inertiajs/react';
import { MdAutoAwesome } from 'react-icons/md';

export default function AiAssistant() {
    const { auth } = usePage().props;
    
    if (!auth.aiEnabled) return null;

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'ai', content: 'Hello! I am your Texport Assistant. Ask me anything about your business data.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post(route('ai.chat'), { message: userMessage });
            const data = response.data;

            if (data.type === 'error') {
                setMessages(prev => [...prev, { type: 'error', content: data.message }]);
            } else if (data.type === 'table_with_summary') {
                setMessages(prev => [...prev, { 
                    type: 'ai', 
                    contentType: 'table',
                    content: data.summary,
                    data: data.content 
                }]);
            } else if (data.type === 'data') {
                // If it's a data table response
                setMessages(prev => [...prev, { 
                    type: 'ai', 
                    contentType: 'table',
                    content: 'Here is the data I found:',
                    data: data.content 
                }]);
            } else {
                // Check if the query returned no results, or if AI gave a text answer
                 if (data.content === null || (Array.isArray(data.content) && data.content.length === 0)) {
                      setMessages(prev => [...prev, { type: 'ai', content: "I found no results for your query." }]);
                 } else {
                     setMessages(prev => [...prev, { type: 'ai', content: data.content }]);
                 }
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { type: 'error', content: 'Failed to connect to the assistant.' }]);
        } finally {
            setLoading(false);
        }
    };

    const renderMessageContent = (msg) => {
        if (msg.contentType === 'table' && Array.isArray(msg.data) && msg.data.length > 0) {
            // Get table headers from first object keys
            const headers = Object.keys(msg.data[0]);

            // Optimization: If it is a single value (1 row, 1 col), don't show the table, 
            // because the text summary (msg.content) already covers it.
            if (msg.data.length === 1 && headers.length === 1) {
                 return <p className="whitespace-pre-wrap text-base">{msg.content}</p>;
            }

            return (
                <div className="overflow-x-auto mt-2">
                    <p className="mb-2 text-sm whitespace-pre-wrap">{msg.content}</p>
                    <table className="min-w-full text-xs text-left text-gray-700 dark:text-gray-300">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {headers.map(header => (
                                    <th key={header} className="px-2 py-1 rounded">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {msg.data.map((row, i) => (
                                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    {headers.map(header => (
                                        <td key={`${i}-${header}`} className="px-2 py-1">
                                            {typeof row[header] === 'object' ? JSON.stringify(row[header]) : row[header]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
        return <p className="whitespace-pre-wrap">{typeof msg.content === 'object' ? JSON.stringify(msg.content) : msg.content}</p>;
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 sm:w-96 bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[500px] transition-all duration-300 ease-in-out dark:bg-gray-900/90 dark:border-gray-700">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-white/20 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="font-semibold tracking-wide">Texport AI</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-sm text-sm ${
                                    msg.type === 'user' 
                                        ? 'bg-blue-600 text-white rounded-br-none' 
                                        : msg.type === 'error'
                                        ? 'bg-red-100 text-red-700 border border-red-200 rounded-bl-none'
                                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                                }`}>
                                    {renderMessageContent(msg)}
                                </div>
                            </div>
                        ))}
                         {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about stocks, invoices..."
                                className="w-full pl-4 pr-12 py-2.5 bg-gray-100 dark:bg-gray-900 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white"
                            />
                            <button 
                                type="submit" 
                                disabled={!input.trim() || loading}
                                className="absolute right-1.5 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-400/30 ${
                    isOpen ? 'bg-gray-800 text-white rotate-90' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                }`}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <MdAutoAwesome className="h-7 w-7" />
                )}
            </button>
        </div>
    );
}
