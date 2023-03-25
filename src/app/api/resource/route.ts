import { getResources } from '@/lib/prisma/utils/resource';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const resourcesTypes = await getResources();
    return NextResponse.json({ data: resourcesTypes }, { status: 200 });
  } catch (error) {
    return NextResponse.error().status;
  }
}
