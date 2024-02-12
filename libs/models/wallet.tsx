import mongoose from 'mongoose';
const { Schema } = mongoose;

const walletSchema = new Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
});

const Wallet = mongoose.models.Wallet || mongoose.model('Wallet', walletSchema);

export default Wallet;