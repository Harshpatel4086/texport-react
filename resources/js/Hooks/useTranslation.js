import { useState, useEffect } from 'react';

const useTranslation = () => {
    const [locale, setLocale] = useState(localStorage.getItem('locale') || 'en');
    const [translations, setTranslations] = useState({});
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load available languages
    const loadLanguages = async () => {
        try {
            const response = await fetch('/api/languages');
            const data = await response.json();
            setLanguages(data.languages || []);
        } catch (error) {
            console.error('Failed to load languages:', error);
        }
    };

    // Load translations for specific language
    const loadTranslations = async (lang) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/translations/${lang}`);
            const data = await response.json();
            setTranslations(data);
        } catch (error) {
            console.error(`Failed to load translations for ${lang}:`, error);
            // Fallback to English if current language fails
            if (lang !== 'en') {
                loadTranslations('en');
            }
        } finally {
            setLoading(false);
        }
    };

    // Initialize
    useEffect(() => {
        loadLanguages();
        loadTranslations(locale);
    }, []);

    // Reload translations when locale changes
    useEffect(() => {
        if (locale) {
            loadTranslations(locale);
        }
    }, [locale]);

    // Translation function
    const t = (key, params = {}) => {
        let value = translations[key];
        
        if (!value) {
            console.warn(`Translation missing for key: ${key}`);
            return key; // Return key if translation not found
        }
        
        // Replace parameters like {name}, {count}
        return Object.keys(params).reduce((str, param) => {
            return str.replace(new RegExp(`{${param}}`, 'g'), params[param]);
        }, value);
    };

    // Change language
    const changeLanguage = (newLocale) => {
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    // Get current language info
    const getCurrentLanguage = () => {
        return languages.find(lang => lang.code === locale) || languages.find(lang => lang.default) || languages[0];
    };

    return { 
        t, 
        locale, 
        changeLanguage, 
        languages, 
        getCurrentLanguage,
        loading 
    };
};

export default useTranslation;