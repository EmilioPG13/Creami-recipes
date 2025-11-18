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
            }
        },
    },
    plugins: [],
}
