import { GlobeAltIcon } from '@heroicons/react/24/outline'; // Heroicons 라이브러리에서 아이콘을 임포트.
import { lusitana } from '@/app/ui/fonts'; // 폰트를 임포트.

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Acme</p>
    </div>
  );
}
