/** @type {import('tailwindcss').Config} */
const defaultColors = require('tailwindcss/colors')
module.exports = {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	plugins: [require("tailwindcss-animate")],
  theme: {
	  screens: {
		  sm: {
			  max: '600px'
		  },
		  tb: {
			  max: '800px',
			  min: '600px'
		  },
		  tab: {
			  max: '800px'
		  },
		  a600: {
			  min: '600px'
		  },
		  a900: {
			  min: '900px'
		  },
		  b900: {
			  max: '900px'
		  },
		  b1000: {
			  max: '1000px'
		  },
		  a800: {
			  min: '800px'
		  },
		  a1000: {
			  min: '1000px'
		  },
		  b800: {
			  max: '800px'
		  },
		  b400: {
			  max: '400px'
		  },
		  tabDispay: {
			  max: '1200px',
			  min: '800px'
		  },
		  web: {
			  min: '1200px'
		  },
		  nsm: {
			  min: '600px'
		  },
		  max800: {
			  max: '800px'
		  },
		  min800: {
			  min: '800px'
		  },
		  min1000: {
			  min: '1000px'
		  },
		  max1000: {
			  max: '1000px'
		  },
		  b1200: {
			  max: '1200px'
		  },
		  a1200: {
			  min: '1200px'
		  },
		  b1400: {
			  max: '1400px'
		  },
		  a1400: {
			  min: '1400px'
		  },
		  shareModal: {
			  max: '425px'
		  }
	  },
	  colors: {
		  '1': 'var(--text-1)',
		  '2': 'var(--text-2)',
		  '3': 'var(--text-3)',
		  '4': 'var(--text-4)',
		  '5': 'F7F7F7',
		  '6': 'var(--text-4)',
		  'blue-1': '#5973fe',
		  'blue-2': '#0788e6',
		  'light-blue': '#99D5EF',
		  'buffer-blue': '#A3E3FF',

		  'light-border': '#2A2A3A',
		  transparent: 'transparent',
		  ...defaultColors,
		  green: '#3fb68b',
		  red: '#ff5353',
		  blue: 'var(--bg-signature)',
		  grey: '#353945',
	  },
	  backgroundColor: {
		  '1': 'var(--bg-1)',
		  '2': 'var(--bg-2)',
		  '3': '#12121a',
		  '4': '#1D2027',
		  '5': '#1C1C28',
		  primary: 'var(--bg-0)',
		  'cross-bg': '#303044',
		  'vertical-gradient': 'var(--bg-vertical-gradient)',
		  ...defaultColors,
		  grey: '#353945',
		  green: '#3fb68b',
		  red: '#ff5353',
		  blue: 'var(--bg-signature)',
		  transparent: 'transparent'
	  },
	  extend: {
		  keyframes: {
			  fadeIn: {
				  from: {
					  opacity: '0',
					  transform: 'scale(.95)'
				  }
			  },
			  fadeOut: {
				  to: {
					  opacity: '0',
					  transform: 'scale(.95)'
				  }
			  },
			  rotate: {
				  from: {
					  transform: 'rotate(0deg)',
					  'transform-origin': 'center center'
				  },
				  to: {
					  transform: 'rotate(360deg)',
					  'transform-origin': 'center center'
				  }
			  }
		  },
		  animation: {
			  fadeIn: 'fadeIn 0.1s ease-out',
			  fadeOut: 'fadeOut 0.15s ease-out forwards',
			  rotate: 'rotate 1s linear infinite'
		  },
		  spacing: {
			  '1': '2px',
			  '2': '4px',
			  '3': '8px',
			  '4': '12px',
			  '5': '16px',
			  '6': '24px',
			  '7': '32px',
			  '8': '48px',
			  '0': '0px'
		  },
		  borderRadius: {
			  lg: 'var(--radius)',
			  md: 'calc(var(--radius) - 2px)',
			  sm: 'calc(var(--radius) - 4px)'
		  },
		  colors: {
			  background: 'hsl(var(--background))',
			  foreground: 'hsl(var(--foreground))',
			  card: {
				  DEFAULT: 'hsl(var(--card))',
				  foreground: 'hsl(var(--card-foreground))'
			  },
			  popover: {
				  DEFAULT: 'hsl(var(--popover))',
				  foreground: 'hsl(var(--popover-foreground))'
			  },
			  primary: {
				  DEFAULT: 'hsl(var(--primary))',
				  foreground: 'hsl(var(--primary-foreground))'
			  },
			  secondary: {
				  DEFAULT: 'hsl(var(--secondary))',
				  foreground: 'hsl(var(--secondary-foreground))'
			  },
			  muted: {
				  DEFAULT: 'hsl(var(--muted))',
				  foreground: 'hsl(var(--muted-foreground))'
			  },
			  accent: {
				  DEFAULT: 'hsl(var(--accent))',
				  foreground: 'hsl(var(--accent-foreground))'
			  },
			  destructive: {
				  DEFAULT: 'hsl(var(--destructive))',
				  foreground: 'hsl(var(--destructive-foreground))'
			  },
			  border: 'hsl(var(--border))',
			  input: 'hsl(var(--input))',
			  ring: 'hsl(var(--ring))',
			  chart: {
				  '1': 'hsl(var(--chart-1))',
				  '2': 'hsl(var(--chart-2))',
				  '3': 'hsl(var(--chart-3))',
				  '4': 'hsl(var(--chart-4))',
				  '5': 'hsl(var(--chart-5))'
			  }
		  }
	  },
	  borderColor: {
		  '1': '#2a2a3a'
	  },
	  fontSize: {
		  f10: '10px',
		  f11: '11px',
		  f12: '12px',
		  f13: '13px',
		  f14: '14px',
		  f15: '15px',
		  f16: '16px',
		  f20: '20px',
		  f18: '18px',
		  f22: '22px',
		  f24: '24px',
		  f25: '25px',
		  f26: '26px',
		  f27: '27px',
		  f28: '28px'
	  },
	  spacing: {
		  '1': '2px',
		  '2': '4px',
		  '3': '8px',
		  '4': '12px',
		  '5': '16px',
		  '6': '24px',
		  '7': '32px',
		  '8': '48px'
	  },
	  borderRadius: {
		  none: '0',
		  sm: '4px',
		  DEFAULT: '4px',
		  md: '8px',
		  lg: '12px',
		  full: '9999px',
		  large: '16px'
	  }
  },
};
