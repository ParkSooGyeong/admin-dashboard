import { Config } from 'tailwindcss';

// Tailwind 설정을 바로 내보냅니다.
const config: Config = {
  mode: 'jit',  // JIT 모드 활성화
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // Next.js의 app 디렉토리 경로
    './components/**/*.{js,ts,jsx,tsx}',  // 컴포넌트 경로
    './pages/**/*.{js,ts,jsx,tsx}',  // Next.js pages 디렉토리 경로
    './src/**/*.{js,ts,jsx,tsx}',  // src 디렉토리
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
