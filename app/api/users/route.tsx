import { connectToDB } from '@/libs/database/connectToDB';
import Users from '@/libs/models/users';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { hash } from 'bcrypt';

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Login to acess this page' });
  }
  return NextResponse.json({ message: 'Hello' });
};

export const POST = async (request: NextRequest) => {
  try {
    await connectToDB();
    const { username, password } = await request.json()
    const passwordHash = await hash(password, 10);
    const user = await Users.create({
      username: username,
      password: passwordHash,
    });
    console.log('User created');
    return NextResponse.json({
      user,
    });
  } catch (error) {
    console.error('Error message: ', error);
  }
};
