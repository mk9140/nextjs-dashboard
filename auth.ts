import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod'; // 검증 작업을 쉽게 하기 위해 Zod 라는 라이브러리를 사용
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';



// queries the user from the database.
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [ // providers is an array where you list different login options such as Google or GitHub.
    Credentials({
      // authorize func : handle the authentication logic
      async authorize(credentials) {
        const parsedCredentials = z
          // validate the email and password before checking if the user exists in the database
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email); // 이메일로 검색해서 DB로부터 유저 습득
          if (!user) return null;

          // 비밀번호 확인
          const passwordsMatch = await bcrypt.compare(password, user.password);
          // 비밀번호도 정상적으로 일치하면 유저를 반환
          if (passwordsMatch) return user;
        }

        // 형식에 맞지 않는 이메일이나 비밀번호, 유저가 없거나 비밀번호가 일치하지않으면 null 반환
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});