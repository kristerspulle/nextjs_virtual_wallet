import WalletPage from './WalletPage';

const getWallets = async () => {
  const response = await fetch('http://localhost:3000/api/wallets', {
    cache: 'no-store'
  });
  if(!response.ok) {
    console.log(response)
  } else {
    return response.json()
  }
}

export const Wallets = async () => {
  const wallets = await getWallets()
  return(
    <WalletPage wallets={wallets}/>
  )
}

export default Wallets