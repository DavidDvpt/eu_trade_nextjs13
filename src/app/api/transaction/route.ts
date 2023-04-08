import { postTransaction } from '@/lib/prisma/utils/transaction';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token: any = await getToken({ req });

    const res = await req.json();
    const transaction = await postTransaction({ ...res, userId: token.id });

    return NextResponse.json({ data: transaction }, { status: 201 });
  } catch (error) {
    return NextResponse.error().status;
  }
}
