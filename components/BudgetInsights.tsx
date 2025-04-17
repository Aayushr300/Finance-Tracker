'use client';

import { useEffect, useState } from 'react';

interface Transaction {
  amount: number;
  category: string;
  date: string;
}

interface Budget {
  category: string;
  amount: number;
  month: string;
}

export default function BudgetInsights() {
  const [insights, setInsights] = useState<
    { category: string; budgeted: number; actual: number; status: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentMonth = new Date().toLocaleString('default', { month: 'short' }); // e.g., "Apr"

      // Fetch filtered transactions for the current month
      const [txRes, budgetRes] = await Promise.all([
        fetch(`/api/transactions?month=${currentMonth}`),
        fetch('/api/budgets'),
      ]);

      const transactions: Transaction[] = await txRes.json();
      const budgets: Budget[] = await budgetRes.json();

      const actualByCategory: Record<string, number> = {};

      transactions.forEach(tx => {
        actualByCategory[tx.category] = (actualByCategory[tx.category] || 0) + tx.amount;
      });

      const result = budgets
        .filter(b => b.month === currentMonth)
        .map(b => {
          const actual = actualByCategory[b.category] || 0;
          const status =
            actual > b.amount
              ? 'Over Budget'
              : actual === b.amount
              ? 'On Budget'
              : 'Under Budget';

          return {
            category: b.category,
            budgeted: b.amount,
            actual,
            status,
          };
        });

      setInsights(result);
    };

    fetchData();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Spending Insights</h2>
      <div className="space-y-2">
        {insights.length === 0 && (
          <p className="text-gray-500">No insights available for this month.</p>
        )}
        {insights.map(item => (
          <div
            key={item.category}
            className={`p-3 rounded border ${
              item.status === 'Over Budget'
                ? 'bg-red-100 border-red-400 text-red-700'
                : item.status === 'Under Budget'
                ? 'bg-green-100 border-green-400 text-green-700'
                : 'bg-yellow-100 border-yellow-400 text-yellow-700'
            }`}
          >
            <strong>{item.category}:</strong> Spent ₹{item.actual} of ₹
            {item.budgeted} → <em>{item.status}</em>
          </div>
        ))}
      </div>
    </div>
  );
}
