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

// export const POST = async (request: NextRequest) => {
//   const { title, image, paragraph, tag } = await request.json();
//   await connectToDB();
//   await Blog.create({ title, image, paragraph, tag });
//   return NextResponse.json({ message: 'Comment added' }, { status: 201 });
// };