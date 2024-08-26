module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{js,jsx,ts,tsx,vue}'],
  },
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(0deg, rgba(255, 121, 145, 0.10) 0%, rgba(255, 121, 145, 0.10) 100%), #FFF',
        'button-gradient': 'linear-gradient(90deg, #FCA8B7 0%, #FF7991 100%)',
      },
      colors: {
        'background-modal': 'rgba(0, 0, 0, 0.60)'
      },
      strokeWidth: {
        'custom': '1.1172161102294922px',
      },
    },
  },
};
