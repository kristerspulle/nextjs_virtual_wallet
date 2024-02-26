import { connectToDB } from '@/libs/database/connectToDB';
import { NextRequest, NextResponse } from 'next/server';
import Wallet from '@/libs/models/wallet';
import { getServerSession } from 'next-auth';
import authOptions from '@/libs/services/authOptions';

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    
    await connectToDB();
    const wallets = await Wallet.find({user: userId})
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