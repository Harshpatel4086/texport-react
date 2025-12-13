<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class LanguageController extends Controller
{
    public function getLanguages()
    {
        $languagesPath = resource_path('lang/languages.json');
        
        if (!File::exists($languagesPath)) {
            return response()->json(['error' => 'Languages file not found'], 404);
        }
        
        $languages = json_decode(File::get($languagesPath), true);
        
        return response()->json($languages);
    }
    
    public function getTranslations($locale)
    {
        $translationPath = resource_path("lang/{$locale}.json");
        
        if (!File::exists($translationPath)) {
            return response()->json(['error' => 'Translation file not found'], 404);
        }
        
        $translations = json_decode(File::get($translationPath), true);
        
        return response()->json($translations);
    }
}