import { Inter } from 'next/font/google'; // Next.js 의 폰트모듈에서부터 구글폰트 중 하나인 Inter 폰트를 가져옵니다.
import { Lusitana } from 'next/font/google' // 구글폰트 중 하나인 Lusitana 폰트를 가져옵니다.


export const inter = Inter({subsets: ['latin']}) // subset 을 지정한다(필요한 글자만 가져온다)
export const lusitana = Lusitana({weight: '400', subsets: ['latin']}) // weight 과 subset 을 지정한다
