import { headers } from 'next/headers';
import WalletPage from './WalletPage';
import { getServerSession } from 'next-auth';
import authOptions from '@/libs/services/authOptions';

const getWallets = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/wallets`, {
    cache: 'no-store',
    headers: new Headers(headers())
  });
  console.log(Object.fromEntries(headers()));
  
  if(!response.ok) {
    console.log(response)
  } else {
    return response.json()
  }
}

const Wallets: React.FC = async () => {
  // const session = await getServerSession(authOptions)
  // const userId = session?.user?.id
  // console.log(session, userId);
  const wallets = await getWallets()
  
  return(
    <WalletPage wallets={wallets}/>
  )
}

export default Wallets;
