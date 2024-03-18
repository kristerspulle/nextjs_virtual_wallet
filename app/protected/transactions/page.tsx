
import TransactionsPage from './TransactionsPage';


const getTransactions = async () => {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/transactions`, {
      cache: 'no-store',

    });

    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return null;
  }
};

const Transactions: React.FC = async () => {
  const transactions = await getTransactions()
  console.log(transactions)
  return(
    <TransactionsPage transactions={transactions}/>
  )
}

export default Transactions