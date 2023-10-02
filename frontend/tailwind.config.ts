import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                light_text: '#0c1117',
                light_background: '#f2f5f8',
                light_primary: '#30435a',
                light_secondary: '#dae2ec',
                light_accent: '#567aa4',
                dark_text: '#e8edf3',
                dark_background: '#070a0d',
                dark_primary: '#a5b8cf',
                dark_secondary: '#131b25',
                dark_accent: '#5b7fa9',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
    darkMode: 'class',
}
export default config
