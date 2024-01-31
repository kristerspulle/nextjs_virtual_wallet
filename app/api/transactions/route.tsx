import { connectToDB } from '@/libs/database/connectToDB';
import Transactions from '@/libs/models/transactions';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();
    const transactions = await Transactions.find();
    return new NextResponse(JSON.stringify(transactions));
  } catch (error) {
    return new NextResponse('Error in fetching MongoDB data: ' + error);
  }
};