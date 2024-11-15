import type { Config } from 'tailwindcss';
import type { PluginAPI } from 'tailwindcss/types/config';

let plugin = require('tailwindcss/plugin');

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1550px',
      },
    },
    extend: {
      width: {
        '13': '52px',
        '21': '84px',
        '22': '88px',
        '23': '92px',
        '25': '100px',
        '26': '104px',
        '27': '108px',
        '29': '116px',
        '30': '120px',
        '33': '132px',
        '34': '136px',
        '35': '140px',
        '45': '180px',
        '108': '432px',
        '110': '440px',
        '114': '456px',
        '115': '460px',
        '116': '464px',
        '120': '480px',
        '124': '496px',
        '127': '508px',
        '128': '512px',
        '130': '520px',
        '134': '536px',
        '136': '544px',
        '137': '548px',
        '138': '552px',
        '140': '560px',
        '144': '576px',
        '145': '580px',
      },
      gridTemplateColumns: {
        // 24 column grid
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      zIndex: {
        '999': '999',
        '1000': '1000',
        '10000': '10000',
        '1000000': '1000000',
      },
      fontFamily: {
        oldLondon: ['var(--font-oldLondon)'],
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        default: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      screens: {
        '2xs': '180px',
        xs: '320px',
        '3xl': '1600px',
        '4xl': '2048px',
      },
      maxHeight: {
        'screen-minus-footer': 'calc(100vh - 4.5rem)', // Adjust height based on your footer size
      },
      // fontFamily: {
      //   oldEnglish: ['var(--font-oldEnglish)'],
      //   english: ['var(--font-englishTowne)'],
      // },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }: PluginAPI) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
    require('tailwindcss-animate'),
  ],
} satisfies Config;

export default config;
