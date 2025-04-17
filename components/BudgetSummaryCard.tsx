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
  month: string; // Only the month name like "Apr"
}

export default function BudgetSummaryCard() {
  const [summary, setSummary] = useState({
    under: 0,
    on: 0,
    over: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [txRes, budgetRes] = await Promise.all([
        fetch('/api/transactions'),
        fetch('/api/budgets'),
      ]);

      const transactions: Transaction[] = await txRes.json();
      const budgets: Budget[] = await budgetRes.json();

      // Only use the month name, e.g., "Apr"
      const currentMonth = new Date().toLocaleString('default', {
        month: 'short',
      });

      const actualByCategory: Record<string, number> = {};

      transactions.forEach(tx => {
        const txMonth = new Date(tx.date).toLocaleString('default', {
          month: 'short',
        });
        if (txMonth === currentMonth) {
          actualByCategory[tx.category] =
            (actualByCategory[tx.category] || 0) + tx.amount;
        }
      });

      let under = 0;
      let on = 0;
      let over = 0;

      budgets
        .filter(b => b.month === currentMonth)
        .forEach(b => {
          const actual = actualByCategory[b.category] || 0;
          if (actual > b.amount) over++;
          else if (actual === b.amount) on++;
          else under++;
        });

      setSummary({ under, on, over });
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-3">Budget Summary</h2>
      <ul className="space-y-1 text-gray-700">
        <li>✅ Under Budget: {summary.under}</li>
        <li>⚖️ On Budget: {summary.on}</li>
        <li>❌ Over Budget: {summary.over}</li>
      </ul>
    </div>
  );
}
