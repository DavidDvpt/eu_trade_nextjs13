import { getTransactions } from '@/lib/prisma/utils/transaction';
import { SellStatus, Transaction, TransactionType } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);

  const transactionType = searchParams.get('transactionType');
  const sellStatus = searchParams.get('sellStatus');
  const sortKey = searchParams.get('sortKey');
  const order = searchParams.get('order');
  const token: any = await getToken({ req });

  try {
    if (token && params.id) {
      const transactions = await getTransactions({
        userId: token.id,
        itemId: params.id,
        transactionType: transactionType as TransactionType,
        sellStatus: sellStatus as SellStatus,
        sortKey: sortKey as keyof Transaction,
        order: order as Order,
      });

      return NextResponse.json({ data: transactions }, { status: 200 });
    } else {
      return NextResponse.json({ data: 'params missing' }, { status: 422 });
    }
  } catch (error) {
    return NextResponse.error().status;
  }
}
