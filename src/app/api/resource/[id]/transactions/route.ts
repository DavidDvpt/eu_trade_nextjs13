import { getTransactions } from '@/lib/prisma/utils/transaction';
import { SellStatus, Transaction, TransactionType } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const limit = searchParams.get('limit');
  const sortKey = searchParams.get('sortKey');
  const order = searchParams.get('order');
  const sellStatus = searchParams.get('sellStatus');
  const token: any = await getToken({ req });

  try {
    if (token) {
      const transactions = await getTransactions({
        userId: token.id,
        resourceId: params.id,
        transactionType: (type as TransactionType) ?? undefined,
        sellStatus: (sellStatus as SellStatus) ?? undefined,
        limit: Number(limit) ?? undefined,
        sortKey: (sortKey as keyof Transaction) ?? undefined,
        order: (order as sortOrder) ?? undefined,
      });

      return NextResponse.json({ data: transactions }, { status: 200 });
    } else {
      return NextResponse.json({ data: 'params missing' }, { status: 422 });
    }
  } catch (error) {
    return NextResponse.error().status;
  }
}
