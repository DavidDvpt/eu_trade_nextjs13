import { SellStatus, TransactionType } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import client from '../../../../prisma/prismadb';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = await getToken({ req });

    if (token?.id) {
      const response = await client.transaction.findMany({
        where: {
          sellStatus:
            (searchParams.get('sellStatus') as SellStatus) ?? undefined,
          type:
            (searchParams.get('transactionType') as TransactionType) ??
            undefined,
          userId: token.id,
        },
        include: { resource: true },
        orderBy: [{ createdAt: 'asc' }],
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
    const transaction = await client.transaction.create({
      data: {
        type: res.transactionType,
        quantity: res.quantity,
        resourceId: res.resourceId,
        userId: token.id,
        value: res.value,
        sellStatus: res.sellStatus,
        fee: res.fee,
      },
    });

    return NextResponse.json({ data: transaction }, { status: 201 });
  } catch (error) {
    return NextResponse.error().status;
  }
}
