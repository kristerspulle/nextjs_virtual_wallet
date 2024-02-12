import { connectToDB } from '@/libs/database/connectToDB';
import { NextRequest, NextResponse } from 'next/server';
import Wallet from '@/libs/models/wallet';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export const GET = async () => {
  try {
    await connectToDB();
    
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id
    console.log('get userid',userId);
    console.log('session',session);
    const wallets = await Wallet.find({user: '65c8f1ec5e2f289d847231e8'})
    console.log('Wallets for user:', wallets);
    return new NextResponse(JSON.stringify(wallets));
  } catch (error) {
    return new NextResponse('err' + error);
  }
};

export const POST = async (request: NextRequest) => {
  await connectToDB();
  const { name } = await request.json();
  
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id

  await Wallet.create({name, user: userId});

  return NextResponse.json({ message: 'Wallet created' }, { status: 201 });
};