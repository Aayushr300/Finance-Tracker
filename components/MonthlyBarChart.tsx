'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface Transaction {
  amount: number;
  date: string;
  description: string;
  category:string;
}

export default function MonthlyBarChart() {
  const [data, setData] = useState<{ month: string; total: number }[]>([]);

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then((transactions: Transaction[]) => {
        const grouped: Record<string, number> = {};

        transactions.forEach(tx => {
          const month = new Date(tx.date).toLocaleString('default', {
            month: 'short',
            year: 'numeric',
          });
          grouped[month] = (grouped[month] || 0) + tx.amount;
        });

        const formatted = Object.entries(grouped).map(([month, total]) => ({
          month,
          total,
        }));

        setData(formatted);
      });
  }, []);


  

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}