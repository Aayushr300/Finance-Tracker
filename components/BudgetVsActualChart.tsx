'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

export default function BudgetVsActualChart() {
  const [data, setData] = useState<
    { category: string; Budget: number; Actual: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentMonth = new Date().toLocaleString('default', { month: 'short' });

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

      const chartData = budgets
        .filter(b => b.month === currentMonth)
        .map(b => ({
          category: b.category,
          Budget: b.amount,
          Actual: actualByCategory[b.category] || 0,
        }));

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#8884d8" />
          <Bar dataKey="Actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
