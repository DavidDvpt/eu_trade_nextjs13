import { getTransactions } from '@/lib/prisma/utils/transaction';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // const { searchParams } = new URL(req.url);
    const token = await getToken({ req });

    if (token?.id) {
      const result: TransactionBenefitResult = {
        buy: 0,
        feeLost: 0,
        sellBenefit: 0,
        total: 0,
      };

      const response = await getTransactions({ userId: token.id as string });

      response.forEach((t) => {
        t;
        const b = t.value - (t.item?.value ?? 0) * t.quantity;

        if (t.type === 'BUY') {
          result.buy += b;
        } else {
          if (t.sellStatus === 'RETURNED') {
            result.feeLost += t.fee ?? 0;
          } else {
            result.sellBenefit += b - (t.fee ?? 0);
          }
        }
      });

      result.total = result.sellBenefit - result.feeLost - result.buy;

      return NextResponse.json({ data: result }, { status: 200 });
    } else {
      return NextResponse.json(null, { status: 401 });
    }
  } catch (error) {
    return NextResponse.error().status;
  }
}
