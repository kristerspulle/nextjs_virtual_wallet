import { headers } from 'next/headers';
import WalletPage from './WalletPage';
import authOptions from '@/libs/services/authOptions';
import { AuthOptions, getServerSession } from 'next-auth';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

const getWallets = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/wallets`, {
    cache: 'no-store',
    headers: headers()
  });
  if(!response.ok) {
    console.log(response)
  } else {
    return response.json()
  }
}

const Wallets: React.FC = async () => {
  const wallets = await getWallets()
  return(
    <WalletPage wallets={wallets}/>
  )
}

export default Wallets;

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getServerSession(
        context.req,
        context.res,
        authOptions
      ),
    },
  }
}