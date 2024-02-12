import { loginUser } from '@/libs/services/auth';
import { NextApiHandler } from 'next'
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

type Credentials = {
  username: string,
  password: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: 'Username', type: 'text', placeholder: 'Username'},
        password: {label: 'Password', type: 'password', placeholder: 'Password'}
      },
      async authorize(credentials) {
        const { username, password } = credentials as Credentials;

        const user = await loginUser({ username, password });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
}

const handler: NextApiHandler = NextAuth(authOptions);

export { handler as GET, handler as POST };