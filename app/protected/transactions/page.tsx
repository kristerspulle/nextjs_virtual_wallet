import { headers } from 'next/headers';
import TransactionsPage from './TransactionsPage';

const getTransactions = async () => {
  try {

    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/transactions`, {
      cache: 'no-store',
      headers: new Headers(headers())
    })
    
    if(!response.ok) {
      console.log(response)
    } else {
      return response.json()
    }
  } catch (error) {
      throw error
  }
}

const Transactions: React.FC = async () => {
  const transactions = await getTransactions()
  return(
    <TransactionsPage transactions={transactions}/>
  )
}

export default Transactions