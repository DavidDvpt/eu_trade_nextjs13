import {
  getTransactions,
  postTransaction,
} from '@/lib/prisma/utils/transaction';
import { SellStatus, TransactionType } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = await getToken({ req });

    if (token?.id) {
      console.log(token.id);
      const response = await getTransactions({
        sellStatus: searchParams.get('sellStatus') as SellStatus,
        transactionType: searchParams.get('transactionType') as TransactionType,
        userId: token.id as string,
      });
      return NextResponse.json({ data: response }, { status: 200 });
    } else {
      return NextResponse.json(null, { status: 401 });
    }
  } catch (error) {
    return NextResponse.error().status;
  }
  // const { sellStatus, transactionType } = searchParams;
}

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
