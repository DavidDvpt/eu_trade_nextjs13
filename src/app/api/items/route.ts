import { dbGetItems } from '@/lib/prisma/utils/items';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const datas = await dbGetItems({});

    return NextResponse.json({ data: datas }, { status: 200 });
  } catch (error) {
    return NextResponse.error().status;
  }
}
