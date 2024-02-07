import { connectToDB } from '@/libs/database/connectToDB';
import { NextRequest, NextResponse } from 'next/server';
import Wallet from '@/libs/models/wallet';

export const GET = async () => {
  try {
    await connectToDB();
    const wallets = await Wallet.find()
    return new NextResponse(JSON.stringify(wallets));
  } catch (error) {
    return new NextResponse('err' + error);
  }
};

export const POST = async (request: NextRequest) => {
  const { name } = await request.json();
  await connectToDB();
  await Wallet.create(name);
  return NextResponse.json({ message: 'Wallet created' }, { status: 201 });
};