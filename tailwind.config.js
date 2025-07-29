/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'rgb(55 65 81)', // gray-700
            lineHeight: '2', // Loose line height
            fontSize: '1.125rem', // text-lg
            '[class~="lead"]': {
              color: 'rgb(75 85 99)', // gray-600
            },
            p: {
              marginBottom: '3rem', // mb-12
              lineHeight: '2',
            },
            hr: {
              marginTop: '4rem', // mt-16
              marginBottom: '4rem', // mb-16
            },
            a: {
              color: 'rgb(75 85 99)', // gray-600
              textDecoration: 'underline',
              textDecorationColor: 'rgb(156 163 175)', // gray-400
              '&:hover': {
                color: 'rgb(31 41 55)', // gray-800
                textDecorationColor: 'rgb(107 114 128)', // gray-500
              },
            },
            strong: {
              color: 'rgb(31 41 55)', // gray-800
            },
            h1: {
              color: 'rgb(31 41 55)', // gray-800
            },
            h2: {
              color: 'rgb(31 41 55)', // gray-800
            },
            h3: {
              color: 'rgb(31 41 55)', // gray-800
            },
            h4: {
              color: 'rgb(31 41 55)', // gray-800
            },
            code: {
              color: 'rgb(31 41 55)', // gray-800
            },
            'blockquote p:first-of-type::before': {
              content: 'none',
            },
            'blockquote p:first-of-type::after': {
              content: 'none',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': 'rgb(209 213 219)', // gray-300
            '--tw-prose-headings': 'rgb(243 244 246)', // gray-100
            '--tw-prose-lead': 'rgb(156 163 175)', // gray-400
            '--tw-prose-links': 'rgb(156 163 175)', // gray-400
            '--tw-prose-bold': 'rgb(243 244 246)', // gray-100
            '--tw-prose-counters': 'rgb(156 163 175)', // gray-400
            '--tw-prose-bullets': 'rgb(75 85 99)', // gray-600
            '--tw-prose-hr': 'rgb(55 65 81)', // gray-700
            '--tw-prose-quotes': 'rgb(243 244 246)', // gray-100
            '--tw-prose-quote-borders': 'rgb(55 65 81)', // gray-700
            '--tw-prose-captions': 'rgb(156 163 175)', // gray-400
            '--tw-prose-code': 'rgb(243 244 246)', // gray-100
            '--tw-prose-pre-code': 'rgb(209 213 219)', // gray-300
            '--tw-prose-pre-bg': 'rgb(31 41 55)', // gray-800
            '--tw-prose-th-borders': 'rgb(55 65 81)', // gray-700
            '--tw-prose-td-borders': 'rgb(75 85 99)', // gray-600
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}