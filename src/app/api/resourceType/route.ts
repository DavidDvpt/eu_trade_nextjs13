import { getResourceTypes } from '@/lib/prisma/utils/resourceType';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // const d = getServerSession();
    // console.log(request, d);
    const resourcesTypes = await getResourceTypes();
    return NextResponse.json(resourcesTypes);
  } catch (error) {
    return NextResponse.error();
  }
}
