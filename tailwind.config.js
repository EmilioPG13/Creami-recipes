/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Fredoka', 'sans-serif'],
            },
            colors: {
                'creami-pink': {
                    DEFAULT: '#FFC6D9',
                    50: '#FFF5F8',
                    100: '#FFE8EF',
                    200: '#FFD4E2',
                    300: '#FFC6D9',
                    400: '#FF9FBF',
                    500: '#FF78A5',
                },
                'creami-blue': {
                    DEFAULT: '#BAE1FF',
                    50: '#F0F8FF',
                    100: '#E0F0FF',
                    200: '#CCE7FF',
                    300: '#BAE1FF',
                    400: '#8CCFFF',
                    500: '#5EBDFF',
                },
                'creami-mint': {
                    DEFAULT: '#B5EAD7',
                    50: '#F0FBF6',
                    100: '#E0F7ED',
                    200: '#CCF1E2',
                    300: '#B5EAD7',
                    400: '#8DDEC3',
                    500: '#65D2AF',
                },
                'creami-yellow': {
                    DEFAULT: '#FFF5BA',
                    50: '#FFFDF0',
                    100: '#FFFBE0',
                    200: '#FFF8CC',
                    300: '#FFF5BA',
                    400: '#FFEF8C',
                    500: '#FFE95E',
                },
                'creami-dark': '#2D3748',
                'creami-gray': '#F7FAFC',
            },
            keyframes: {
                fadeIn: {
                    'from': { opacity: '0', transform: 'translateY(10px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    'from': { transform: 'scale(0.9)', opacity: '0' },
                    'to': { transform: 'scale(1)', opacity: '1' },
                },
                bounceOnce: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-8px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                slideUp: {
                    'from': { opacity: '0', transform: 'translateY(20px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'bounce-once': 'bounceOnce 0.6s ease-in-out',
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'slide-up': 'slideUp 0.6s ease-out',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
                'gradient': 'gradient 3s ease infinite',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                'glow-pink': '0 0 20px rgba(255, 198, 217, 0.5)',
                'glow-blue': '0 0 20px rgba(186, 225, 255, 0.5)',
            },
        },
    },
    plugins: [],
}
