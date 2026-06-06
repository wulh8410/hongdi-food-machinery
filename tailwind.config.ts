import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        industrial: {
          navy: '#0f2742',
          blue: '#1f5f9f',
          orange: '#f28c28',
          steel: '#6d7886',
          mist: '#eef3f7'
        }
      },
      boxShadow: {
        soft: '0 12px 30px rgba(15, 39, 66, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
