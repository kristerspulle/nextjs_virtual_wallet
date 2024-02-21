import { headers } from 'next/headers';
import WalletPage from './WalletPage';

const getWallets = async () => {
  const response = await fetch('http://localhost:3000/api/wallets', {
    cache: 'no-store',
    headers: headers()
  });
  if(!response.ok) {
    console.log(response)
  } else {
    return response.json()
  }
}



const Wallets = async () => {
  const wallets = await getWallets()
  return(
    <WalletPage wallets={wallets}/>
  )
}

export default Wallets