import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db'; // ✅ updated to match your path
import {Transaction} from '@/models/Transaction'; // make sure this path is correct

export async function PUT(req: NextRequest) {
  try {
    await connectDB(); // ✅ uses your function

    const id = req.nextUrl.pathname.split('/').pop();
    if (!id) {
      return NextResponse.json({ error: 'Missing transaction ID' }, { status: 400 });
    }

    const body = await req.json();

    const updatedTransaction = await Transaction.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTransaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTransaction);
  } catch (error) {
    console.error('PUT /api/transactions/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
