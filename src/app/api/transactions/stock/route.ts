import { getStocks } from '@/lib/prisma/utils/transaction';
import { SellStatus, TransactionType } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const setCurrent = (e: DbUserStock, q: number): UserStock => ({
  iId: e.itemId,
  iName: e.itemName,
  iValue: e.itemValue,
  quantity: q,
  value: 0,
});

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (token?.id) {
      const stocks = await getStocks(token.id as string);

      const result: UserStocks = [];
      let c: UserStock | null = null;

      for (let i = 0; i < stocks.length; i++) {
        const e = stocks[i];
        const buyType = e.transactionType === TransactionType.BUY;
        const sellOk =
          e.sellStatus !== SellStatus.RETURNED &&
          e.transactionType === TransactionType.SELL;
        let q = 0;

        if (buyType) q = +e.quantity;
        if (sellOk) q = -e.quantity;

        if (!c) {
          c = setCurrent(e, q);
        } else {
          if (c.iId !== e.itemId) {
            c.value = c.quantity * c.iValue;
            result.push(c);
            c = setCurrent(e, q);
          } else {
            c.quantity += q;
          }
        }

        if (i === stocks.length - 1) {
          c.value = c.quantity * c.iValue;
          result.push(c);
        }
      }

      const sorted = result.sort((a, b) => (a.iName > b.iName ? 1 : -1));

      return NextResponse.json({ data: sorted }, { status: 200 });
    } else {
      return NextResponse.json(null, { status: 401 });
    }
  } catch (error) {
    return NextResponse.error().status;
  }
}
