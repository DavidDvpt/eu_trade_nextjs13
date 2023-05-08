import { dbGetItemTypes } from '@/lib/prisma/utils/itemTypes';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const datas = await dbGetItemTypes({});

    return NextResponse.json({ data: datas }, { status: 200 });
  } catch (error) {
    return NextResponse.error().status;
  }
}
