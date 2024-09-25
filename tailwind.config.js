// tailwind.config.js
module.exports = {
  mode: 'jit', // Just-In-Time 모드 활성화
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // Next.js app 디렉토리
    './components/**/*.{js,ts,jsx,tsx}',  // 컴포넌트 디렉토리
    './pages/**/*.{js,ts,jsx,tsx}',  // pages 디렉토리
    './src/**/*.{js,ts,jsx,tsx}',  // src 디렉토리
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
