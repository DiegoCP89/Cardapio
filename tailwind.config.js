/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html, js}"],
  theme: {
    fontFamily:{
      'sans': ['Roboto', 'sans-serif']
    }, 
    extend: {
      backgroundImage:{
        "home-bg": "url('/assets/bg.png')"
      }
    },
  },
  plugins: [],
  safelist: [  // <-- Adicione isso aqui
    'bg-gray-900',
    'hover:bg-gray-800',  // Pra incluir o hover também
    'grid',
    'grid-cols-1',
    'md:grid-cols-2',
    'gap-7',
    'md:gap-10',
    'max-w-7xl',
    'mx-auto',
    'px-2',
    'mb-16',
    'bg-red-500', 
    'z-50', 
    'fixed', 
    'bottom-0'
  ],
}

