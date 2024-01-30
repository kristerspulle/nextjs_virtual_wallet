// const getWallet = async (id: string) => {
//   const response = await fetch(`http://localhost:3000/dashboard/${id}`)

//   if(!response.ok) {
//     console.log(response)
//   } else {
//     return response.json()
//   }
// }

export const Dashboard = async ({params}: {params: {id: string}}) => {
  // const wallet = await getWallet(params.id)
  // console.log(wallet);
  
  return(
    <>
      <div>hey dashboard</div>
    </>
  )
}

export default Dashboard