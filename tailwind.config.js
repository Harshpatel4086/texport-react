import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    DEFAULT: '#1E88E5',
                    50: '#E3F2FD',
                    100: '#BBDEFB',
                    500: '#1E88E5',
                    600: '#1976D2',
                    700: '#1565C0',
                },
                secondary: {
                    DEFAULT: '#00B8A9',
                    50: '#E0F2F1',
                    100: '#B2DFDB',
                    500: '#00B8A9',
                    600: '#00A693',
                    700: '#00897B',
                },
                background: '#F9FAFB',
                neutral: '#CFD8DC',
                text: '#263238',
            },
            backgroundImage: {
                'brand-gradient': 'linear-gradient(135deg, #1E88E5 0%, #00B8A9 100%)',
            },
        },
    },

    plugins: [
        forms,
        plugin(function({ addUtilities }) {
            addUtilities({
                '.scrollbar-hide': {
                    /* Hide scrollbar for IE, Edge and Firefox */
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                    /* Hide scrollbar for Chrome, Safari and Opera */
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
                '.scrollbar-custom': {
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#475569', // slate-600
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#1E88E5', // primary color
                        borderRadius: '3px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#1976D2', // primary-600
                    },
                    // Firefox
                    'scrollbar-width': 'thin',
                    'scrollbar-color': '#1E88E5 #475569',
                },
            })
        })
    ],
};
