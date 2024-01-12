'use server'; // 파일 내에서 내보낸 모든 함수를 서버 함수로 표시한다.

import { z } from 'zod';
import { sql } from '@vercel/postgres';
// Next.js 에서는 캐시를 사용하여 유저가 페이지를 탐색할 때의 요청수를 줄인다. 이 캐시를 지우고 요청을 다시 트리거 하기 위해 아래 메소드를 사용.
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
}); // Zod 라이브러리 사용
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // input 태그로부터 반환된 값을 데이터베이스에 저장하기 전에,
  // 타입이 맞는지 확인해야 한다.
  // 예를 들어, input 태그 type 이 number 라고 해도, 실제 반환되는 타입은 string을 반환된다.
  // 검증 작업을 쉽게 하기 위해 Zod 라는 라이브러리를 사용해보자.

  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식의 날짜를 반환한다.

  // insert수행
  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // try/catch 블럭 밖에 있음을 주목하자.
  revalidatePath('/dashboard/invoices'); // 캐시를 지우고 요청을 다시 트리거 하기 위해 사용
  redirect('/dashboard/invoices'); // 리다이렉트
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true }); // Use Zod to update the expected types
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice'); // error.tsx 동작 확인용 에러

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    // 인덱스화면에서 삭제 버튼을 누르므로, 삭제 후 딱히 리다이렉트 할 필요 없다.
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}