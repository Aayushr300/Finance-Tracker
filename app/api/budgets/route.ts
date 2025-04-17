import { connectDB } from '@/lib/db';
import { Budget } from '@/models/Budget';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectDB();
  const { category, amount, month } = await req.json();

  if (!category || !amount || !month) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const budget = new Budget({ category, amount, month });
  await budget.save();

  return NextResponse.json({ success: true });
}

export async function GET() {
  await connectDB();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}
