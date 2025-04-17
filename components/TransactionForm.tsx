'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import CategorySelect from './CategorySelect';

type TransactionFormProps = {
  onAdd: () => void;
};

export default function TransactionForm({ onAdd }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    category: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { amount, date, description, category } = formData;

    // Basic validation
    if (!amount || !date || !description || !category) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(amount),
          date,
          description,
          category,
        }),
      });

      if (res.ok) {
        toast.success('Transaction added successfully!');
        setFormData({ amount: '', date: '', description: '', category: '' });
        onAdd(); // ✅ Trigger parent refresh
      } else {
        toast.error('Failed to add transaction.');
      }
    } catch (error) {
      toast.error('An error occurred.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-xl shadow-md">
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <Input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="₹ Amount"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Date</label>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Transaction description"
        />
      </div>

      <CategorySelect value={formData.category} onChange={handleCategoryChange} />

      <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
        Add Transaction
      </Button>
    </form>
  );
}
