import { postTransaction } from '@/lib/prisma/utils/transaction';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token: any = await getToken({ req });
    console.log(token);
    const res = await req.json();
    const transaction = await postTransaction({ ...res, userId: token.id });
    console.log(transaction);
    return NextResponse.json({ data: [] }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error().status;
  }
}
