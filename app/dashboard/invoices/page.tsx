import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
/*
참고
여기서는 searchParams 을 사용했다.
그런데 ui/search.tsx 에서는 useSearchParams 라는 훅을 사용했다.
언제 무엇을 사용하는가?
-> 클라이언트에서 작업하는지 서버에서 작업하는지에 따라 다릅니다.
ui/search.tsx 는 클라이언트 구성 요소('use client' 주석이 있음)이므로 클라이언트의 매개변수에 접근하기 위한 훅인 useSearchParams 을 사용.
(Page 에서 사용된) Table컴포넌트는 서버에서 데이터를 가져오는 서버 구성요소 이므로, 브라우저 페이지에서 컴포넌트로 searchParams 을 전달 prop으로 전달.
*/



// Page 컴포넌트를 변경(ch.11)
// 구성을 살펴보자.(https://nextjs.org/docs/app/api-reference/file-conventions/page)
// aync : 비동기적인 로직을 수행할 수 있게 해주는 키워드
// function : 함수형 컴포넌트를 의미함
// Page : 컴포넌트의 이름
// {searchParams} :  searchParams 이라는 객체를 prop으로 받는다
// : {searchParams?: {query?: string, page?: string} } : 타입스크립트의 타입정의 부분
// searchParams는 query와 page 속성을 가질 수 있는 객체이며, 이 속성들은 모두 선택적(? 기호가 붇음)입니다.
// query는 string 타입, page도 string 타입입니다.
export default async function Page({searchParams}: {searchParams?: {query?: string, page?: string} } ) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query); // 페이지네이션에 사용할 총 페이지수
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* input 태그를 포함해서 유저가 검색할 수 있게하는 컴포넌트 */}
        <Search placeholder="Search invoices..." />
        {/* invoice 생성 Link가 포함된 컴포넌트 */}
        <CreateInvoice />
      </div>
      {/* Suspense 를 이용(스트리밍) */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}