import { headers } from 'next/headers';
import TransactionsPage from './TransactionsPage';

const getTransactions = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/transactions`, {
    cache: 'no-store',
    headers: new Headers(headers())
  })
  
  if(!response.ok) {
    // console.log(response)
    throw(response)
  } else {
    return response.json()
  }
}

const Transactions = async () => {
  const transactions = await getTransactions()
  console.log(transactions)
  return(
    <TransactionsPage transactions={transactions}/>
  )
}

export default Transactions