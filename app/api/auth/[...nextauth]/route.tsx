import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { authOptions } from '@/libs/services/authOptions';

const handler: NextApiHandler = NextAuth(authOptions);

export { handler as GET, handler as POST };
