import { DeleteButton, OpenWalletButton } from '../components/Buttons/Buttons';
import styles from './page.module.css'

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
    <main className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Wallets</h1>
        <p>List of wallets for your account</p>
      </div>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Wallet Name</th>
              <th>Wallet Balance</th>
              <th>Wallet Currency</th>
              <th>Wallet Actions</th>
            </tr>
          </thead>
          <tbody className={styles.walletsWrapper}>
            {wallets.map((wallet: Wallet) => (
              <tr key={wallet._id} className={styles.wallet}>
                <td>{wallet.name}</td>
                <td>{wallet.balance}</td>
                <td>{wallet.currency}</td>
                <td><OpenWalletButton type='button' text='Open' walletId={wallet._id}/></td>
                <td><DeleteButton type='button' text='Delete' walletId={wallet._id}/></td>
              </tr>
            ))}
          </tbody>
        </table>
    </main>
  )
}

export default Wallets