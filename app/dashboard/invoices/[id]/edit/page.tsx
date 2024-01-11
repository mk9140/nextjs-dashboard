
/*
* 디렉토리 경로에 주목하자. : invoices/[id]/edit
* 폴더 이름을 대괄호로 묶었다 -> 동적 경로
* 미리 정의된 URL 주소로만 라우팅하는 것이 아니라 사용자가 접근한 경로 혹은 상황에 따라 동적인 라우팅을 제공하고 싶을 때 사용한다.
* 중첩으로 사용하면 다중 동적 라우팅을 구현할 수도 있다. (customers/[id]/invoices/[id]/edit)
* */

import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  // 편집 화면에서는 유저가 선택한(클릭한) 송장의 내용이 미리 채워져 있어야 한다.
  const id = params.id;   // 이를 위해 특정 송장을 DB로부터 가져오기 위해 id를 사용한다.
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}