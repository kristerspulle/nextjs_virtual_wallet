

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


const Home = async () => {
 const wallets = await getWallets()

  return (
    <>
      <div className='box'>balance</div>
      <div className='box'>incoming</div>
      <div className='box'>outgoing</div>
      <div className='box'>balance</div>
      <div className='box'>balance</div>
      <div>
       {wallets.map((wallet) => (
          <div key={wallet._id}>
            <div>{wallet.name}</div>
            <div>{wallet.balance}</div>
            <div>{wallet.currency}</div>
          </div>
       ))}
      </div>
    </>
  );
}

export default Home;
// wallets: {
//   name: {
//     balance: number
//     transactions: {
//       type: string
//       description: string
//       value: number
//       fraudulent: boolean
//     }
//   },
//   name1: {
//     balance:
//     asjdasd:
//   }
// }