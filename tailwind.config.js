module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        amarillo: '#facc15', // amarillo personalizado para botones
        azulFuerte: '#1e3a8a',
        verdeClaro: '#4ade80',
      },
      fontSize: {
        'xxs': '0.65rem',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};