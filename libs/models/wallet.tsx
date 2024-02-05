import mongoose from 'mongoose';
const { Schema } = mongoose;

const walletSchema = new Schema({
  name: String,
  currency: String
});

const Wallet = mongoose.models.Wallet || mongoose.model('Wallet', walletSchema);

export default Wallet;