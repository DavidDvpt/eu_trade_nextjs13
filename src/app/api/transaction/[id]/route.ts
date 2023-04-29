import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import client from '../../../../../prisma/prismadb';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token: any = await getToken({ req });
    const res = await req.json();
    console.log(
      token.id,
      res.userId,
      token.id === res.userId,
      params.id,
      res.id,
      params.id === res.id
    );

    if (token.id === res.userId && params.id === res.id) {
      const transaction = await client.transaction.update({
        where: { id: params.id },
        data: {
          type: res.type,
          quantity: res.quantity,
          resourceId: res.resourceId,
          userId: res.userId,
          value: res.value,
          sellStatus: res.sellStatus,
          fee: res.fee,
          modifiedAt: new Date().toISOString(),
        },
      });

      return NextResponse.json({ data: transaction }, { status: 200 });
    } else {
      return NextResponse.json({}, { status: 403 });
    }
  } catch (error) {
    return NextResponse.error().status;
  }
}
