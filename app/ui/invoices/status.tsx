import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx'; // 상태나 다른 조건에 따라 CSS 클래스를 조건부로 지정할 때 사용하는 라이브러리

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          // invoice 의 상태에 따라 다른 스타일을 지정한다.
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
