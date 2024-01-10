// import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
// import {fetchRevenue, fetchLatestInvoices, fetchCardData} from '@/app/lib/data'; // 데이터베이스에서 데이터를 가져오는 쿼리(select문)를 실행하는 함수
// import { fetchLatestInvoices, fetchCardData} from '@/app/lib/data'; // fetchRevenue (느린 데이터요청을 상정한 함수)는 Suspense를 사용하기위해 제외했다.
// import { fetchCardData} from '@/app/lib/data'; // fetchLatestInvoices는 Suspense를 사용하기위해 제외했다. fetchCardData 또한 제외했다.

import CardWrapper from '@/app/ui/dashboard/cards'; // Card 컴포넌트를 그룹화한 컴포넌트
import { CardSkeleton } from "@/app/ui/skeletons"; // 로딩중 표시할 UI인, 스켈레톤 UI 컴포넌트를 임포트

import { Suspense } from 'react'; // Suspense 컴포넌트를 임포트
import { RevenueChartSkeleton, LatestInvoicesSkeleton } from '@/app/ui/skeletons'; // 로딩중 표시할 UI인, 스켈레톤 UI 컴포넌트를 임포트

// 비동기로 데이터를 습득하기 위해 async/await 사용
export default async function Page() {
  // 데이터 가져오기의 경우 각 요청은 이전 요청이 데이터를 반환한 후에만 시작할 수 있습니다.(request waterfalls)

  // const revenue = await fetchRevenue(); // fetchRevenue (느린 데이터요청을 상정한 함수)는 Suspense를 사용하기 위해(컴포넌트 내부에서 fetch) 제외했다.
  // const latestInvoices = await fetchLatestInvoices(); // Suspense를 사용하기 위해(컴포넌트 내부에서 fetch) 제외했다.

  // 일반적인 변수 할당 방법
  // const cardData = await fetchCardData();
  // const numberOfCustomers = cardData.numberOfCustomers;
  // const numberOfInvoices = cardData.numberOfInvoices;
  // const totalPaidInvoices = cardData.totalPaidInvoices;
  // const totalPendingInvoices = cardData.totalPendingInvoices;

  // 분해 할당
  // fetchCardData함수가 리턴하는 객체의 프로퍼티를 분해하여 변수에 할당.
  // 기본적으로는 객체의 프로퍼티명과 동일한 변수명을 사용해야 하지만, 다른 변수명을 사용하고 싶다면 아래와 같이 사용.
  // const { originalName: newName } = someObj;
  // const {
  //   numberOfCustomers,
  //   numberOfInvoices,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData(); // fetchLatestInvoices() 가 종료된 다음 실행된다.

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 컴포넌트도 Suspense 로 감싸고 싶다. */}
        {/* 각 카드에서 필요한 데이터(totalPaidInvoices, totalPendingInvoices, ...) 를 개별적으로 fetch 하는 방식으로 할 수 있지만... */}
        {/* fetch 완료된 카드가 개별적으로 렌더링되면 유저 입장에서는 시각적으로 불편할 수 있다.(정신 사납다...) */}
        {/* Suspense를 사용하면서(스트리밍하면서) 동시에 로딩되게 하려면, 그룹화를 해야한다. */}
        {/* Card 컴포넌트를 그룹화한 CardWrapper라는 컴포넌트를 Suspense로 감싼다. */}
        <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
        </Suspense>

        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />*/}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" />*/}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />*/}
        {/* <Card*/}
        {/*  title="Total Customers"*/}
        {/*  value={numberOfCustomers}*/}
        {/*  type="customers"*/}
        {/*/>*/}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Suspense 컴포넌트를 사용해서, 특정 컴포넌트를 스트리밍 */}
        {/* 일부 조건이 충족될 때까지(예: 데이터 로드) 애플리케이션의 렌더링 부분을 연기할 수 있습니다. */}
        {/* 렌더링을 연기할 때, 폴백UI(로딩중임을 나타내는 UI를 만든 컴포넌트)를 표시하기 위한 컴포넌트를 지정할 수 있다. */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          {/* RevenueChart 컴포넌트 내부에서 데이터를 가져오고있다(느린 속도의 데이터 습득을 상정한 함수 실행중) */}
          {/* 이제, RevenueChart 에서 데이터를 다 받기 전에도 RevenueChart 이외의 부분은 렌더링된다! */}
          <RevenueChart />
        </Suspense>

        {/* 연습. LatestInvoices 도 스트리밍해보자.*/}
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}