import { getStockByResourceId } from '@/lib/prisma/utils/transaction';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token: any = await getToken({ req });
    if (token && params.id) {
      const stock = await getStockByResourceId(token.id, params.id);

      console.log('stock', stock);
      return NextResponse.json({ stock }, { status: 200 });
    } else {
      return NextResponse.json({ data: 'no params' }, { status: 422 });
    }
  } catch (error) {
    return NextResponse.error().status;
  }
}
