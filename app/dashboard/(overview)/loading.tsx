/*
* loading.tsx (타입스크립트 미사용시에는 .js)
* Suspense 를 기반으로 구축된 특별한 Next.js 파일이다.
* loading 이라는 파일명은 고정이다.(만들면 자동으로 특별한 파일로서 인식한다)
* (https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
*
* 페이지 콘텐츠가 로드되는 동안 대체 UI로 표시할 폴백 UI를 생성할 수 있습니다.
* */







import DashboardSkeleton from '@/app/ui/skeletons'; // 스켈레톤 UI 컴포넌트를 임포트
// 스켈레톤? : 사용할 UI 의 단순화된 버전. 자리 표시자 역할을 한다.(유저에게 로딩중임을 나타낸다.)
// 예를 들어, 이미지나 숫자가 표시될 카드모양 UI가 있다면, 스켈레톤 UI는 이미지나 숫자가 표시되는 부분을 단순한 회색박스로 표시한다.



export default function Loading() {
  // loading.tsx(js) 파일에 삽입한 모든 UI는, 정적 파일의 일부로 포함되어 먼저 전송됩니다.
  return <DashboardSkeleton />;
}
// SideNav 컴포넌트는 정적이므로, 폴백UI(로딩UI) 가 표시되는 상황에서도 렌더링되며 상호작용 할 수 있다.
// -> 사용자는 다른 페이지로 이동하기 전에 페이지 로드가 완료될 때까지 기다릴 필요가 없습니다(이를 중단 가능한 탐색이라고 함)(interruptable navigation)