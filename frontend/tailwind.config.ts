import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                light_text: '#120d26',
                light_background: '#f2f0fa',
                light_primary: '#281d54',
                light_secondary: '#cac1ea',
                light_accent: '#4f39a7',
                dark_text: '#f2f0fa',
                dark_background: '#120d26',
                dark_primary: '#281d54',
                dark_secondary: '#07050e',
                dark_accent: '#a99cdd',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
    darkMode: 'class',
}
export default config
