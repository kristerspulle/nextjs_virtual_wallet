import mongoose from 'mongoose';
const { Schema } = mongoose;

const walletSchema = new Schema({
  name: String,
  balance: Number,
  currency: String
});

const Wallet = mongoose.models.Wallet || mongoose.model('Wallet', walletSchema);

export default Wallet;