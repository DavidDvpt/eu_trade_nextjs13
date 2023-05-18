import { getTransaction } from '@/lib/prisma/utils/transaction';
import { TransactionType } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get('type');
  const token: any = await getToken({ req });

  try {
    if (params.id && type && token) {
      const transactions = await getTransaction(
        token.id,
        params.id,
        type as TransactionType
      );

      return NextResponse.json({ data: transactions }, { status: 200 });
    } else {
      return NextResponse.json({ data: 'params missing' }, { status: 422 });
    }
  } catch (error) {
    return NextResponse.error().status;
  }
}
