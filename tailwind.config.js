/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: '0.75rem' /* 12px */,
      sm: '0.875rem' /* 14px */,
      base: '1rem' /* 16px */,
      lg: ['1.125rem', '1.625rem'] /* 18px,  26px */,
      xl: '1.375rem' /* 22px */,
      '2xl': '1.5rem' /* 24px */,
      '3xl': '2rem' /* 32px */,
    },
    minWidth: {
      select: '12.5rem' /* 200px */,
    },
    extend: {
      boxShadow: {
        header: '0 2px 4px hsl(0 0% 0% / 0.06)',
        box: '0 0 7px 2px hsl(0 0% 0% / 0.03)',
        button: '0 0 4px 1px hsl(0 0% 0% / 0.11)',
        darkbutton: '0 0 4px 1px hsl(200 15% 8% / 0.25)',
      },
      colors: {
        darkblue: 'hsl(209, 23%, 22%)',
        darkerblue: 'hsl(207, 26%, 17%)',
        verydarkblue: 'hsl(200, 15%, 8%)',
        verylightgrey: 'hsl(0, 0%, 98%)',
        medgrey: 'hsl(0, 0%, 52%)',
      },
      gridTemplateColumns: {
        countries: 'repeat(auto-fill,16.5rem)',
      },
      lineHeight: {
        7.5: '1.875rem' /* 30px */,
      },
      maxWidth: {
        container: '84rem' /* 1344px (1280 plus padding) */,
      },
      spacing: {
        4.5: '1.125rem' /* 18px */,
        18: '4.5rem' /* 72px */,
        30: '7.5rem' /* 120px */,
        68: '16.5rem' /* 264px */,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
