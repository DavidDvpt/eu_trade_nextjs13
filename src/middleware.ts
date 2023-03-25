// middleware.ts
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: 'not authorized' }, { status: 401 });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/resourceType/:path*',
};
