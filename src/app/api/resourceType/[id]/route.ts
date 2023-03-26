import { getResources } from '@/lib/prisma/utils/resource';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const resources = await getResources();
    return NextResponse.json({ data: resources }, { status: 200 });
  } catch (error) {
    return NextResponse.error().status;
  }
}