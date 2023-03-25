import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const d = getServerSession();
  console.log(d);
  return new Response('Hello, Next.js!');
}
