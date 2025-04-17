'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  transactions: {
    amount: number;
    category: string;
  }[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F', '#FFBB28'];

const CategoryPieChart: React.FC<Props> = ({ transactions }) => {
  const data = transactions.reduce<Record<string, number>>((acc, tx) => {
    const amount = Math.abs(tx.amount);
    const category = tx.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const chartData = Object.entries(data).map(([category, value]) => ({
    name: category,
    value,
  }));


  return (
    <div className="w-full h-[300px] bg-blue-50 rounded-lg p-4">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
  
  );
};

export default CategoryPieChart;
