'use client';

import { useState, useEffect } from 'react';

export default function BudgetForm() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('');
  const [categories, setCategories] = useState<string[]>([]);


  

  
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/transactions');
      const data = await res.json() as { category: string }[];
const uniqueCategories = [...new Set(data.map((tx) => tx.category))];
setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, amount: Number(amount), month }),
    });

    setCategory('');
    setAmount('');
    setMonth('');
   
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
        placeholder="Amount"
        className="border p-2 w-full"
        required
      />

      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="">Select Month</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Add Budget
      </button>
    </form>
  );
}
