'use client';

import { useEffect, useState } from 'react';
import { Transaction } from '@/types';

interface Props {
  refresh: boolean;
}

export default function TransactionList({ refresh }: Props) {
  const [data, setData] = useState<Transaction[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    category: '',
  });

  const fetchTransactions = () => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(setData);
  };

  useEffect(() => {
    fetchTransactions(); // fetch on mount or refresh
  }, [refresh]);

  useEffect(() => {
    const interval = setInterval(fetchTransactions, 10000); // every 10 seconds
    return () => clearInterval(interval); // clean up on unmount
  }, []);

 

  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
    });
    fetchTransactions();
  };

  const handleEdit = (tx: Transaction) => {
    setEditId(tx._id);
    setFormData({
      amount: String(tx.amount),
      date: tx.date.toISOString().slice(0, 10),

      description: tx.description,
      category: tx.category,
    });
  };

  const handleUpdate = async () => {
    if (!editId) return;

    await fetch(`/api/transactions/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        amount: parseFloat(formData.amount),
      }),
    });

    setEditId(null);
    fetchTransactions();
  };

  return (
    <div className="space-y-4">
      {data.map(tx => (
        <div
          key={tx._id}
          className="border p-4 rounded shadow flex flex-col md:flex-row md:items-center justify-between"
        >
          {editId === tx._id ? (
            <div className="space-y-2 flex flex-col md:flex-row md:items-center gap-2 w-full">
              <input
                type="text"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="border rounded px-2 py-1"
              />
              <input
                type="number"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                className="border rounded px-2 py-1"
              />
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="border rounded px-2 py-1"
              />
              <input
                type="text"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="border rounded px-2 py-1"
              />
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditId(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div>
                <div className="font-medium">{tx.description}</div>
                <div className="text-sm text-gray-600">
                  ₹ {tx.amount} on {new Date(tx.date).toLocaleDateString()} ({tx.category})
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => handleEdit(tx)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tx._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
