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
                'creami-pink': '#FFC6D9',
                'creami-blue': '#BAE1FF',
                'creami-mint': '#B5EAD7',
                'creami-yellow': '#FFF5BA',
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
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'bounce-once': 'bounceOnce 0.6s ease-in-out',
            }
        },
    },
    plugins: [],
}
