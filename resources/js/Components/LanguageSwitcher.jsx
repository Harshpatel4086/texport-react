import { useState } from 'react';
import { useLanguage } from '@/Contexts/LanguageContext';
import { MdExpandMore } from 'react-icons/md';

// Flag component for SVG flags
const FlagIcon = ({ countryCode, className = '' }) => {
    return (
        <span
            className={`fi fi-${countryCode} ${className}`}
            style={{ fontSize: '0.9em' }}
        />
    );
};

export default function LanguageSwitcher({ className = '' }) {
    const { locale, changeLanguage, languages, getCurrentLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const currentLang = getCurrentLanguage();

    if (!currentLang || languages.length === 0) {
        return null;
    }

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1.5 px-2 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-globe h-4 w-4"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                </svg>
                <span className="text-gray-700 font-medium">{currentLang?.nativeName}</span>
                <FlagIcon countryCode={currentLang?.flag} />
                <MdExpandMore
                    className={`w-3 h-3 text-gray-600 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                        <div className="py-1">
                            {languages.map((language) => (
                                <button
                                    key={language.code}
                                    onClick={() => {
                                        changeLanguage(language.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                                        locale === language.code
                                            ? "bg-primary-50 text-primary"
                                            : "text-gray-700"
                                    }`}
                                >
                                    <FlagIcon countryCode={language.flag} />
                                    <div className="flex-1">
                                        <div className="font-medium text-sm">
                                            {language.nativeName}
                                        </div>
                                        {/* <div className="text-xs text-gray-500">
                                            {language.name}
                                        </div> */}
                                    </div>
                                    {locale === language.code && (
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
