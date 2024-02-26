import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next/types';
export { default } from "next-auth/middleware"

export const config = { matcher: "/protected/*"}

// Using Next.js 
export function authenticationMiddleware(request: NextApiRequest) {
  if (!request.headers.cookies?.includes('authenticated=true')) {

    return NextResponse.redirect('/api/auth/signin');
  }
  return NextResponse.next();
}