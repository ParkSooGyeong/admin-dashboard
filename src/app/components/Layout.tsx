"use client"; // 클라이언트 컴포넌트로 설정

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { RecoilRoot } from 'recoil'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 화면 외부 클릭 시 사이드바 닫기 로직 추가
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarOpen && !(event.target as HTMLElement).closest('.sidebar') && !(event.target as HTMLElement).closest('.header')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <RecoilRoot>
      <div className="min-h-screen flex bg-gray-100">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col">
          <Header toggleSidebar={toggleSidebar} />
          {children}
        </div>
      </div>
    </RecoilRoot>
  );
}
