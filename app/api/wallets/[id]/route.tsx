import { connectToDB } from '@/libs/database/connectToDB';
import Wallet from '@/libs/models/wallet';
import { NextRequest, NextResponse } from 'next/server';


export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    const blog = await Wallet.findById(params.id);
    return new NextResponse(JSON.stringify(blog));
  } catch (error) {
    return new NextResponse('Error in fetching MongoDB data: ' + error);
  }
};