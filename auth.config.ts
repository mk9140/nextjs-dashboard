import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: { //  로그인, 로그아웃 및 오류 페이지에 대한 경로를 지정
    signIn: '/login',
  },
  callbacks: { // 콜백들은 리퀘스트가 완료되기 전에 호출됨.
    // authorized 콜백:  페이지에 액세스하도록 승인되었는지 확인하는 데 사용
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;