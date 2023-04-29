import { putTransaction } from '@/lib/prisma/utils/transaction';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token: any = await getToken({ req });
    const res = await req.json();

    if (token.id === res.userId && params.id === res.id) {
      const transaction = await putTransaction(res);

      return NextResponse.json({ data: transaction }, { status: 200 });
    } else {
      return NextResponse.json({}, { status: 403 });
    }
  } catch (error) {
    return NextResponse.error().status;
  }
}
