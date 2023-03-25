import { getResourcesByTypeId } from '@/lib/prisma/utils/resource';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resources = await getResourcesByTypeId(params.id);
    return NextResponse.json({ data: resources }, { status: 200 });
  } catch (error) {
    return NextResponse.error().status;
  }
}
