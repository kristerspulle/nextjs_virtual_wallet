import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';
export { default } from "next-auth/middleware"

export const config = { matcher: "/protected/:path*"}

// Using Next.js 
// export async function authenticationMiddleware(request: NextRequest) {
//   const session = await getServerSession()
//   return NextResponse.next();
// }