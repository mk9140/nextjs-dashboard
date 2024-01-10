import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import {fetchRevenue, fetchLatestInvoices, fetchCardData} from '@/app/lib/data'; // 데이터베이스에서 데이터를 가져오는 쿼리(select문)를 실행하는 함수

// 비동기로 데이터를 습득하기 위해 async/await 사용
export default async function Page() {
  // 데이터 가져오기의 경우 각 요청은 이전 요청이 데이터를 반환한 후에만 시작할 수 있습니다.(request waterfalls)

  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices(); // fetchRevenue() 가 종료된 다음 실행된다.

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
  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData(); // fetchRevenue() 가 종료된 다음 실행된다.

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
         <Card title="Collected" value={totalPaidInvoices} type="collected" />
         <Card title="Pending" value={totalPendingInvoices} type="pending" />
         <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
         <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue}  />
         <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}