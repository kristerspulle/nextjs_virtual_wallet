import { connectToDB } from '@/libs/database/connectToDB';
import Transaction from '@/libs/models/transactions';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    const deleteTransaction = await Transaction.findByIdAndDelete(params.id)
    return new NextResponse(JSON.stringify(deleteTransaction))
  } catch (error) {
    return new NextResponse('An error occured while deleting transaction: ' + error);
  }
}