import { putTransaction } from '@/lib/prisma/utils/transaction';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const token: any = await getToken({ req });

    const res = await req.json();

    const transaction = await putTransaction({ ...res, userId: token.id });

    return NextResponse.json({ data: transaction }, { status: 201 });
  } catch (error) {
    return NextResponse.error().status;
  }
}
