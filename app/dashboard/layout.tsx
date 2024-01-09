import SideNav from '@/app/ui/dashboard/sidenav';
import React from "react";

// layout 은 해당 화면과 그 자식 화면에서 공통적으로 사용되는 UI를 만드는 파일이다.

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        {/* 해당 화면과 자식 화면에 공통적으로 사용할 컴포넌트 */}
        <SideNav />
      </div>
      {/* children 을 통해 해당 화면 및 자식 화면의 page.tsx 를 렌더링한다. */}
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}