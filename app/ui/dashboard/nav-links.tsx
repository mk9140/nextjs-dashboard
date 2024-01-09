"use client" // 리엑트의 지시어 중 하나. 파일의 맨 위에 import 보다 먼저 정의한다.
// 서버 전용 부분에서 클라이언트 부분으로 넘어가는 경계점을 정의합니다.
// "use client"가 파일에 정의되면 하위 구성 요소를 포함한 모든 모듈이 클라이언트 번들의 일부로 간주됩니다.

// Next.js에서는 서버 구성 요소가 기본값입니다. 따라서 "use client" 지시어로 시작하는 모듈에서 정의되거나 가져오지 않은 경우
// 모든 React 구성 요소가 서버 구성 요소 모듈 그래프의 일부가 됩니다.
// Server Component vs. Client Component를 언제 사용해야 할까요?(https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
//                        무엇을 할 때?                                    Server Component   Client Component
// 데이터 가져오기                                                                  ✅                     ❌️
// 백엔드 리소스에 직접 액세스하기                                                      ✅                     ❌
// 서버에 민감한 정보 유지하기 (액세스 토큰, API 키 등)                                    ✅                     ❌
// 큰 종속성을 서버에 유지/클라이언트 측 JavaScript 줄이기	                                ✅                     ❌
// 상호 작용 및 이벤트 리스너 추가하기(onClick(), onChange() 등)                         ❌                     ✅
// 상태 및 라이프사이클 효과 사용하기(useState(), useReducer(), useEffect() 등)          ❌                     ✅
// 브라우저 전용 API 사용하기	                                                        ❌                     ✅
// 상태, 효과 또는 브라우저 전용 API에 의존하는 사용자 지정 훅 사용하기                        ❌                     ✅
// React Class 컴포넌트 사용하기                                                     ❌                     ✅


import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link'; // Next.js 의 Link 컴포넌트 사용을 위한 임포트
import {useParams, usePathname} from "next/navigation"; // Next.js 의 useParams 훅(hook) 사용을 위한 임포트
import clsx from 'clsx'; // CSS 클래스를 조건부로 추가하기 위한 라이브러리 임포트

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname(); // Next.js 의 usePathname 훅(hook) 사용
  console.log('🚀 ~ file: nav-links.tsx:#43, ~ x:', pathname);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
            // 페이지를 연결하기 위해서는 일반적으로 <a> 태그를 사용한다.
            // <a> 태그는 페이지 전체가 새로고침되며 새로운 페이지가 로드된다.
            // <a
            //   key={link.name}
            //   href={link.href}
            //   className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            // >
            //   <LinkIcon className="w-6" />
            //   <p className="hidden md:block">{link.name}</p>
            // </a>

            // Next.js 의 Link 컴포넌트를 사용하면 페이지가 새로고침되지 않고 페이지가 로드된다.
            // Link 컴포넌트는 백그라운드에서 연결된 경로에 대한 코드를 자동으로 미리 가져온다.(Automatic code-splitting and prefetching)
            // 사용자가 링크를 클릭하면 대상 페이지의 코드가 이미 백그라운드에 로드되어있으므로 페이지 전환이 거의 즉각적으로 이루어집니다.
            <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                  {
                    'bg-sky-100 text-blue-600': pathname === link.href, // 현재 페이지의 사이드바 링크를 파란색 배경으로 강조한다.
                  },
                )}
            >
              <LinkIcon className="w-6"/>
              <p className="hidden md:block">{link.name}</p>
            </Link>
        );
      })}
    </>
  );
}
