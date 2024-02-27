import { headers } from 'next/headers';
import WalletPage from './WalletPage';
import { GetSessionParams, getSession } from 'next-auth/react';

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

export async function getServerSideProps(context: GetSessionParams | undefined) {
  // Retrieve the user's session from the context
  const session = await getSession(context);

  // If the user is not authenticated, redirect to the login page
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}
export default Wallets;