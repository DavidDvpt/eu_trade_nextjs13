import { getResources } from '@/lib/prisma/utils/resource';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const resourceTypes = await getResources();

    return NextResponse.json({ data: resourceTypes }, { status: 200 });
  } catch (error) {
    return NextResponse.error().status;
  }
}
