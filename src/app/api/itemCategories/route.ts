import { dbGetItemCategories } from '@/lib/prisma/utils/itemCategories';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const datas = await dbGetItemCategories();

    return NextResponse.json({ data: datas }, { status: 200 });
  } catch (error) {
    return NextResponse.error().status;
  }
}
