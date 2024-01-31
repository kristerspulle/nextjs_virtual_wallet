type Wallet = {
  _id: string,
  name: string,
  balance: number,
  currency: string
}

type Transaction = {
  _id: string,
  description: string,
  amount: number,
  currency: string,
  createdAt: Date,
  type: string
}