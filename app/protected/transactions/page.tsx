import { headers } from 'next/headers';
import TransactionsPage from './TransactionsPage';

const getTransactions = async () => {
  const response = await fetch('http://localhost:3000/api/transactions', {
    cache: 'no-store',
    headers: headers()
  })

  if(!response.ok) {
    console.log(response)
  } else {
    return response.json()
  }
}

const Transactions = async () => {
  const transactions = await getTransactions()
  return(
    <TransactionsPage transactions={transactions}/>
  )
}

export default Transactions