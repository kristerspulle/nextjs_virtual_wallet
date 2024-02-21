import authOptions from '@/libs/services/authOptions';
import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';


const handler: NextApiHandler = NextAuth(authOptions);

export { handler as GET, handler as POST };
