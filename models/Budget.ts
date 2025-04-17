import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema(
  {
    category: String,
    amount: Number,
    month: String, // e.g., 'Apr 2025'
  },
  { timestamps: true }
);

export const Budget =
  mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
