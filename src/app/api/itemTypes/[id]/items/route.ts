import { dbGetItems } from '@/lib/prisma/utils/items';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const datas = await dbGetItems({ itemTypeId: params.id });

    return NextResponse.json({ data: datas }, { status: 200 });
  } catch (error) {
    return NextResponse.error().status;
  }
}
