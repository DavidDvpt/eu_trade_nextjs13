import { getTransactionsBenefit } from '@/lib/prisma/utils/transaction';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = await getToken({ req });

    if (token?.id) {
      const response = await getTransactionsBenefit(token.id as string);

      return NextResponse.json({ data: response }, { status: 200 });
    } else {
      return NextResponse.json(null, { status: 401 });
    }
  } catch (error) {
    return NextResponse.error().status;
  }
  // const { sellStatus, transactionType } = searchParams;
}
