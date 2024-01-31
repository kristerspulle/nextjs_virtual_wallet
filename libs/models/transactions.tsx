import mongoose from 'mongoose';
const { Schema } = mongoose;

const transactionSchema = new Schema({
  description: String,
  amount: Number,
  currency: String,
  type: String,
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
  },
},
{
  timestamps: true
});

const Transactions = mongoose.models.Transactions || mongoose.model('Transactions', transactionSchema);

export default Transactions;