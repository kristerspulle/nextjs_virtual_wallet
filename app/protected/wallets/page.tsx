import { headers } from 'next/headers';
import WalletPage from './WalletPage';
import { getServerSession } from 'next-auth';
import authOptions from '@/libs/services/authOptions';
import { redirect } from 'next/navigation';

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
  const session = await getServerSession(authOptions)
  if(!session) {
    redirect('/api/auth/signin')
  }
  const wallets = await getWallets()
  return(
    <WalletPage wallets={wallets}/>
  )
}

export default Wallets;
