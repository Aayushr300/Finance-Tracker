// models/Transaction.ts
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    amount: Number,
    date: Date,
    description: String,
    category: String, 
  },
  { timestamps: true }
);

export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
