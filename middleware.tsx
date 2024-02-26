import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next/types';
export { default } from "next-auth/middleware"

export const config = { matcher: "/protected/(.*)"}

// Using Next.js 
export function authenticationMiddleware(request: NextApiRequest) {
  console.log(request.headers.cookie);
  
  if (!request.headers.cookie?.includes('authenticated=true')) {

    return NextResponse.redirect('/api/auth/signin');
  }
  return NextResponse.next();
}