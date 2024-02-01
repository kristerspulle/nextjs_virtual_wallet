import { connectToDB } from '@/libs/database/connectToDB';
import Wallet from '@/libs/models/wallet';
import { NextRequest, NextResponse } from 'next/server';


export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    const wallet = await Wallet.findById(params.id);
    return new NextResponse(JSON.stringify(wallet));
  } catch (error) {
    return new NextResponse('Error in fetching MongoDB data: ' + error);
  }
};

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    const deleteWallet = await Wallet.findByIdAndDelete(params.id)
    return new NextResponse(JSON.stringify(deleteWallet))
  } catch (error) {
    return new NextResponse('An error occured while deleting wallet: ' + error);
  }
}