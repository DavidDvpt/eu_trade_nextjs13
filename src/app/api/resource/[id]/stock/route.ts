import { getStockByResourceId } from '@/lib/prisma/utils/transaction';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const stock = await getStockByResourceId(params.id);
    return NextResponse.json({ data: stock }, { status: 200 });
  } catch (error) {
    return NextResponse.error().status;
  }
}
