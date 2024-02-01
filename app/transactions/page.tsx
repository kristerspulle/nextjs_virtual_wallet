import { format } from "date-fns";
import styles from './page.module.css'

const getTransactions = async () => {
  const response = await fetch('http://localhost:3000/api/transactions', {
    cache: 'no-store'
  })

  if(!response.ok) {
    console.log(response)
  } else {
    return response.json()
  }
}

const newTransaction = async () => {
  await fetch('http://localhost:3000/api/wallets/65b7a3ea0b4756f735d7663c/transactions', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({description: 'bouldering', type: 'outgoing', amount: 60, currency: 'EUR'}),
  })
}


const Transactions = async () => {
  const transactions = await getTransactions()
  // newTransaction()
  return(
    <main className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Transactions</h1>
        <p>All of the transactions for your Account</p>
      </div>
      <table data-toggle='table' className={styles.table}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          
      {transactions.map((transaction: Transaction) => {
        return(
          <tr key={transaction._id}>
            <td>{transaction.description}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.currency}</td>
            <td>{transaction.type}</td>
            <td>{format(transaction.createdAt, 'dd.MM.yyyy HH:mm')}</td>
          </tr>
        )
      })}
        </tbody>
      </table>
    </main>
  )
}

export default Transactions