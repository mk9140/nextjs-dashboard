'use client'; // 클라이언트 컴포넌트

import { useEffect } from 'react';

/*
* 모든 오류를 헨들링할 수 있다.
* */
export default function Error({
  // prop으로 error와 reset을 받는다.
  error,
  reset,
}: {
  // error는 javascrip의 Error 객체와 digest를 포함한다.
  error: Error & { digest?: string };
  // reset은 에러를 제거하고 다시 렌더링하는데 사용하는 함수이다.(try again 버튼 클릭을 생각하면 된다.)
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}