import '@/app/ui/global.css'; // 글로벌 스타일. 사이트 전체 스타일 등과 같은 CSS 규칙을 정의. 일반적으로 최상위의 구성 요소(즉, 루트 레이아웃)에 추가하는 것이 좋다.
import { inter } from '@/app/ui/fonts'; // 폰트를 임포트.
import { Metadata } from 'next'; // 메타데이터 작성

// 메타데이터의 Config-based 방식
export const metadata: Metadata = {
  title: {
    // template: 각 페이지에 대한 템플. %s 자리가 각 페이지에서 정의한 title 의 값으로 대체된다.
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

// 루트 레이아웃. 필수. 모든 페이지에서 공유되는 레이아웃.
// 주로 메타데이터와 <html>태그, <body>태그를 포함한다.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Tailwind 사용하여 폰트를 추가한 예. antialiased 는 폰트를 부드럽게 만들어주는 클래스 */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
