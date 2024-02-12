type Wallet = {
  _id: string,
  name: string,
  user: string
}

type Transaction = {
  _id: string,
  description: string,
  amount: number,
  currency: string,
  createdAt: Date,
  type: string
}