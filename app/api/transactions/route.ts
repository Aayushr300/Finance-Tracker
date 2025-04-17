import { connectDB } from "@/lib/db";
import { Transaction } from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month"); // e.g., "Apr"

  let transactions;

  if (month) {
    const currentYear = new Date().getFullYear();
    const fullDate = new Date(`${month} 1, ${currentYear}`);

    const start = new Date(fullDate.getFullYear(), fullDate.getMonth(), 1);
    const end = new Date(fullDate.getFullYear(), fullDate.getMonth() + 1, 1);

    transactions = await Transaction.find({
      date: { $gte: start, $lt: end },
    }).sort({ date: 1 });
  } else {
    transactions = await Transaction.find().sort({ date: 1 });
  }

  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  await connectDB();
  const { amount, date, description, category } = await req.json();

  if (!amount || !date || !description || !category) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const newTransaction = new Transaction({
    amount,
    date,
    description,
    category,
  });

  await newTransaction.save();

  return NextResponse.json({ success: true });
}
