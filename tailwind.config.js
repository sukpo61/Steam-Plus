/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
        './path-to-your-custom-layer-file/**/*.{html,js}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                primary: {
                    foreground: 'hsl(var(--primary-foreground))',
                    brighter: 'hsl(var(--primary-brighter))',
                    bright: 'hsl(var(--primary-bright))',
                    DEFAULT: 'hsl(var(--primary))',
                    dark: 'hsl(var(--primary-dark))',
                    darker: 'hsl(var(--primary-darker))',
                    darkest: 'hsl(var(--primary-darkest))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    dark: 'hsl(var(--secondary-dark))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                publish: {
                    DEFAULT: 'hsl(var(--publish))',
                    foreground: 'hsl(var(--publish-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
            },
            backgroundImage: {
                'gradient-radial':
                    'radial-gradient(farthest-corner at 40px 40px,var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            borderRadius: {
                full: '50%',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            screens: {
                sm: '640px',
                md: '800px',
                lg: '1148px',
                xl: '1412px',
                '2xl': '1700px',
                '3xl': '1920px',
                '4xl': '2160px',
            },
        },
    },

    plugins: [require('tailwindcss-animate')],
};
