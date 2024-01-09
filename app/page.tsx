import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import Image from 'next/image'; // Next.js 의 Image 컴포넌트를 임포트.
// Image 컴포넌트는 HTML img 태그의 확장이다. : 이미지 로드될 때 레이아웃 이동 방지, 이미지 크기 조절, 기본적으로 지연로딩, 최신 형식의 이미지 확장자 지원


import someStyles from '@/app/ui/home.module.css'; // CSS 모듈을 사용. import 할 때, 적당히 이름을 변경할 수 있다.

export default function Page() {
  return (
      //   className 속성은 CSS 클래스를 지정하는 데 사용된다. 여기서는 Tailwind CSS를 사용하고 있으므로, Tailwind CSS의 클래스를 지정한다.
      <main className="flex min-h-screen flex-col p-6">
        <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
          {/* 컴포넌트 */}
          <AcmeLogo/>
        </div>
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            {/* Tailwind CSS 를 사용한 예*/}
            <div
                className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"
            />
            {/* CSS 모듈을 사용한 예 */}
            <div className={someStyles.shape}/>
            <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
              <strong>Welcome to Acme.</strong> This is the example for the{' '}
              <a href="https://nextjs.org/learn/" className="text-blue-500">
                Next.js Learn Course
              </a>
              , brought to you by Vercel.
            </p>
            <Link
                href="/login"
                className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6"/>
            </Link>
          </div>
          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            {/* Add Hero Images Here */}
            {/* Next.js 의 Image 컴포넌트를 사용하여 이미지를 최적화 */}
            {/* 일반적인 HTML img 태그 를 사용해서 추가할 수도 있지만 다양한 화면 크기에 반응, 이미가 로드될 때 레이아웃 바뀌는 것 방지, 지연 로드 이미지 등을 수동으로 구현해야 한다.*/}
            <Image
                src="/hero-desktop.png" // 이미지 경로
                width={1000} // 이미지 너비
                height={760} // 이미지 높이
                className="hidden md:block" // 모바일 화면이면 이미지를 숨기고, 데스크톱화면이라면 이미지를 보여준다.
                alt="Screenshots of the dashboard project showing desktop version"
            />
            {/* 모바일 화면용 이미지 */}
            <Image
                src="/hero-mobile.png"
                width={560}
                height={620}
                className="block md:hidden" // 모바일 화면이면 이미지를 표시하고, 데스크톱화면이라면 이미지를 숨긴다.
                alt="Screenshots of the dashboard project showing mobile version"
            />
          </div>
        </div>
      </main>
  );
}
