import { headers } from 'next/headers';
import WalletPage from './WalletPage';

const getWallets = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/wallets`, {
    cache: 'no-store',
    headers: new Headers(headers())
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
// const getTransactions = async () => {
//   try {

//     const response = await fetch(`${process.env.NEXTAUTH_URL}/api/transactions`, {
//       cache: 'no-store',
//       headers: new Headers(headers())
//     })
//     if(!response.ok) {
//       console.log(response)
//     } else {
//       console.log(response)
//       return response.json()
//     }
//   } catch (error) {
//       throw error
//   }
// }