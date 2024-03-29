import { loginUser } from '@/libs/services/auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type Credentials = {
  username: string;
  password: string;
};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
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
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin'
  }
};

export default authOptions;
