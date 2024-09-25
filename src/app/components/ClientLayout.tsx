"use client"; // 클라이언트 컴포넌트로 설정

import { RecoilRoot } from 'recoil'
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <RecoilRoot>
      <div className="min-h-screen flex">
        {/* 사이드바 */}
        <Sidebar isOpen={sidebarOpen} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } />

        {/* 메인 컨텐츠 */}
        <div className="flex-1 flex flex-col">
          {/* 헤더 (모바일용) */}
          <Header toggleSidebar={toggleSidebar} />

          {/* 페이지 컨텐츠 */}
          {children}
        </div>
      </div>
    </RecoilRoot>
  );
}
