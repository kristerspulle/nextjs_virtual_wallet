import { compare } from 'bcrypt';
import { connectToDB } from '../database/connectToDB';
import Users from '../models/users';

interface UserLoginData {
  username: string;
  password: string;
}

export const loginUser = async ({ username, password }: UserLoginData) => {
  await connectToDB();
  if (!username || !password) {
    throw new Error('Username or Password was not provided');
  }

  const user = await Users.findOne({
    username,
  });
  if (!user) {
    throw new Error(`Username ${username} doesn't exist`);
  }

  if (user.password) {
    const isValid = await compare(password, user.password);

    if (!isValid) {
      throw new Error('Password is incorrect');
    }
  } else {
    throw new Error('Something went wrong X_X');
  }

  return user;
};
