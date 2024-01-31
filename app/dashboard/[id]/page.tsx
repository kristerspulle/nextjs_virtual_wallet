import { DeleteButton } from '@/app/components/Buttons/Buttons'
import styles from './page.module.css'

const getWalletData = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/wallets/${id}`, {
    cache: 'no-store'
  })

  if(!response.ok) {
    console.log(response)
  } else {
    return response.json()
  }
}

const Dashboard = async ({params}: {params: {id: string}}) => {
  const wallet = await getWalletData(params.id)
  return(
    <main className={styles.wrapper}>
      <div className={styles.header}>
        <h1>{wallet.name}</h1>
        <p>Detailed information about {wallet.name}</p>
      </div>
      <div className={styles.details}>
        <div className={styles.balanceInfo}>
          <div className={styles.balance}>{wallet.balance}</div>
          <div className={styles.currency}>{wallet.currency}</div>
          <div className={styles.incoming}>Incoming</div>
          <div className={styles.outgoing}>outgoing</div>
        </div>
        <div>
          <div className={styles.recent}>Recent transaction table (5)</div>
          <DeleteButton text='See all transactions' type='button' walletId={params.id}/>
        </div>
      </div>
    </main>
  )
}

export default Dashboard