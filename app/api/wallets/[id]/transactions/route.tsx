import { connectToDB } from '@/libs/database/connectToDB';
import Transactions from '@/libs/models/transactions';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    const transactions = await Transactions.find({wallet: params.id});
    return new NextResponse(JSON.stringify(transactions));
  } catch (error) {
    return new NextResponse('Error in fetching MongoDB data: ' + error);
  }
};