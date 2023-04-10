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
    console.log(searchParams);
    const response = await getTransactions({
      sellStatus: searchParams.get('sellStatus') as SellStatus,
      transactionType: searchParams.get('transactionType') as TransactionType,
    });
    return NextResponse.json({ data: response }, { status: 200 });
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
