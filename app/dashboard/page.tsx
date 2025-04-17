import { Suspense } from 'react';
import { Transaction } from '@/models/Transaction';
import { connectDB } from '@/lib/db';
import { Budget } from '@/models/Budget';
import { Button } from '@/components/ui/button';
import BudgetForm from '@/components/BudgetForm'; // Now a Client Component
import BudgetSummaryCard from '@/components/BudgetSummaryCard';
import BudgetVsActualChart from '@/components/BudgetVsActualChart';
import BudgetInsights from '@/components/BudgetInsights';
import CategoryPieChart from '@/components/CategoryPieChart';
import SummaryCards from '@/components/SummaryCards';
import Link from 'next/link';
import TransactionList from '@/components/TransactionList';

async function getData() {
  await connectDB();

  const transactions = await Transaction.find().lean();
  const budgets = await Budget.find().lean();

  return {
    transactions: JSON.parse(JSON.stringify(transactions)),
    budgets: JSON.parse(JSON.stringify(budgets)),
  };
}

export default async function DashboardPage() {
  const { transactions, budgets } = await getData();

  return (
    <main className="p-6 space-y-8">
      <Link href="./"><Button className='bg-red-500 m-2 w-xl'>Home</Button></Link>
      <h1 className="text-2xl m-5 font-bold">Dashboard</h1>

      <SummaryCards transactions={transactions} budgets={budgets} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CategoryPieChart transactions={transactions} />
        <BudgetVsActualChart />
      </div>

      <BudgetForm /> {/* No onAdd prop needed here anymore */}
      <BudgetSummaryCard />
      <BudgetInsights />

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">All Transactions</h2>
        <Suspense fallback={<div>Loading transactions...</div>}>
          <TransactionList refresh={false} />
        </Suspense>
      </div>
    </main>
  );
}