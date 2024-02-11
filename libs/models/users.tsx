import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String
});

const Users = mongoose.models.Users || mongoose.model('Users', userSchema);

export default Users;