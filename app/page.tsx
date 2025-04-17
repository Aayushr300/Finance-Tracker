'use client';

import { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import MonthlyBarChart from '../components/MonthlyBarChart';


import Link from 'next/link';


export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <main className="p-6 space-y-6">
     
      <h1 className="text-2xl font-bold m-2">Personal Finance Tracker</h1>

      <Link
        href="/dashboard"
        className="bg-blue-600 text-white p-2 m-3 mt-2x rounded-lg shadow hover:bg-blue-700"
      >Dashboard</Link>
      <TransactionForm onAdd={() => setRefresh(prev => !prev)} />
      <TransactionList refresh={refresh} />
  
      <MonthlyBarChart />
    </main>
  );
}