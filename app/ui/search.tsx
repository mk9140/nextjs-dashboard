'use client'; // 이벤트리스너를 사용하기위해 클라이언트 컴포넌트로 변경

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// Next.js 의 useSearchParams 훅(hook) : 현재 URL의 쿼리 매개변수에 액세스할 수 있습니다.
// 예를 들어 현재 URL과 쿼리 매개변수가 다음과 같을 때 :/dashboard/invoices?page=1&query=pending
// 결과는 다음과 같이 보일 것입니다 : {page: '1', query: 'pending'}

// usePathname 훅(hook) : 현재 URL의 경로에 액세스할 수 있습니다.
// 예를 들어, 경로가 /dashboard/invoices 이라면, usePathname은 다음을 반환 한다: '/dashboard/invoices'

// useRouter 훅(hook) : 현재 페이지의 URL, 쿼리 파라미터, 라우트 매개변수 등과 같은 라우터 정보에 접근할 수 있습니다.

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // 현재의 URL 검색 매개변수를 가져온다.
  const pathname = usePathname(); // 현재 URL의 경로를 가져온다.
  const { replace } = useRouter(); // AppRouterInstance의 기능 중, 라우터 정보를 수정 할 수 있는 메소드인 replace 를 가져온다.

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams); // URLSearchParams: URL 쿼리 매개변수를 조작하기 위한 유틸리티 메서드를 제공하는 웹 API
    // 다음과 같은 형식으로 매개변수 문자열을 얻을 수 있습니다 : '?page=1&query=a'

    // input 태그에 무언가 입력된다면, query 라는 이름의 쿼리 매개변수를 추가하고, 그 값은 input 태그에 입력된 값으로 설정한다.
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`); // URL업데이트 : 현재 경로에 쿼리 매개변수를 추가한다(params는 URL친화적인 형태로 변환)

  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()} // 현재 URL의 쿼리 매개변수를 가져온다. (검색후에도 입력란에 검색어가 남아있도록 하기 위함)
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
