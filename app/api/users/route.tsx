import { connectToDB } from '@/libs/database/connectToDB';
import Users from '@/libs/models/users';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';

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
