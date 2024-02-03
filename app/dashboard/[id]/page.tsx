import DashboardPage from './DashboardPage'

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

const getTransactionData = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/wallets/${id}/transactions`, {
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
  const transactions = await getTransactionData(params.id)
  return(
    <DashboardPage wallet={wallet} transactions={transactions}/>
  )
}

export default Dashboard