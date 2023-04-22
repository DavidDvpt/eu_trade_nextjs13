import { getResources } from '@/lib/prisma/utils/resource';
import { getStock } from '@/lib/prisma/utils/transaction';
import { Resource } from '@prisma/client';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (token?.id) {
      const stocks = await getStock(token.id as string);
      const resources = await getResources();

      const result: Stocks = [];
      let c: IStock | null = null;
      let cr: Resource | null = null;
      for (let i = 0; i < stocks.length; i++) {
        const e = stocks[i];
        const setResource = () =>
          resources?.find((res) => res.id === e.resourceId) as Resource;
        let q = 0;
        if (e.type === 'BUY') q = e._sum.quantity as number;
        if (e.type === 'SELL' && e.sellStatus !== 'RETURNED')
          q = (e._sum.quantity as number) * -1;

        const setCurrent = () => {
          return {
            resourceId: e.resourceId,
            resourceName: cr?.name ?? '',
            quantity: q,
            value: 0,
          };
        };
        if (!c) {
          cr = setResource();
          c = setCurrent();
        } else {
          if (c.resourceId !== e.resourceId) {
            c.value = c.quantity * (cr as Resource)?.value;
            result.push(c);
            cr = setResource();
            c = setCurrent();
          } else {
            c.quantity += q;
          }
        }

        if (i === stocks.length - 1) {
          c.value = c.quantity * (cr as Resource)?.value;
          result.push(c);
        }
      }

      const sorted = result.sort((a, b) =>
        a.resourceName > b.resourceName ? 1 : -1
      );

      return NextResponse.json({ data: sorted }, { status: 200 });
    } else {
      return NextResponse.json(null, { status: 401 });
    }
  } catch (error) {
    return NextResponse.error().status;
  }
}
