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
        <table data-toggle='table' className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <td>Wallet Name</td>
              <td>Wallet Balance</td>
              <td>Wallet Currency</td>
              <td>Wallet Actions</td>
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