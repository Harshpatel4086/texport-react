import { createContext, useContext } from 'react';
import useTranslation from '@/Hooks/useTranslation';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const translation = useTranslation();
    
    return (
        <LanguageContext.Provider value={translation}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};