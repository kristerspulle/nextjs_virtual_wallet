import mongoose from 'mongoose';

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.omb9nhp.mongodb.net/VirtualWallet`

export const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Mongo connection successful");
} catch (error) {
    console.error("Error on connecting DB: ", error);
}
}