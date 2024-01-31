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

export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const { description, amount, type, currency } = await request.json()
    await connectToDB();
    await Transactions.create({description: description, amount: amount, currency: currency, type: type, wallet: params.id});
    return NextResponse.json({ message: 'Transaction added' }, { status: 201 });
  } catch (error) {
    return new NextResponse('Error occured while adding a new transaction:' + error)
  }
}