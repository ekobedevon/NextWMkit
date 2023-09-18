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
                light_text: '#0d0f26',
                light_background: '#fbfbfe',
                light_primary: '#262e73',
                light_secondary: '#b6b6f6',
                light_accent: '#3c47af',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
export default config
