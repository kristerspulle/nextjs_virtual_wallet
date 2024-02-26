import Wallets from '@/libs/models/wallet';
import { connectToDB } from '@/libs/database/connectToDB';
import Transactions from '@/libs/models/transactions';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/libs/services/authOptions';

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const userWallets = await Wallets.find({user: userId})
    const walletIds = userWallets.map((wallet) => wallet.id)
    const transactions = await Transactions.find({wallet: walletIds});
    
    return new NextResponse(JSON.stringify(transactions));
  } catch (error) {
    return new NextResponse('Error in fetching MongoDB data: ' + error);
  }
};