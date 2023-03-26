// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: 'not authorized' }, { status: 401 });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/resourceType/:path*', '/api/resource/:path*'],
};
