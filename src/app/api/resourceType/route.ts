import { getResourceTypes } from '@/lib/prisma/utils/resourceType';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const resourcesTypes = await getResourceTypes();
    return NextResponse.json({ data: resourcesTypes }, { status: 200 });
  } catch (error) {
    return NextResponse.error().status;
  }
}
