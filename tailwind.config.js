import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

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
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                heading: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                surface: {
                    DEFAULT: '#F8F9FA',
                    canvas: '#F9FAFB',
                    dim: '#D9DADB',
                },
                slate: {
                    950: '#0B0F19',
                    900: '#111827',
                },
                growth: {
                    DEFAULT: '#10B981',
                    light: '#ECFDF5',
                },
                variance: {
                    negative: '#EF4444',
                    negativeLight: '#FEF2F2',
                },
            },
        },
    },

    plugins: [forms],
};
