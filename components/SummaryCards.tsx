'use client';

import React from 'react';

interface Props {
    transactions: {
      amount: number;
      category?: string;
      [key: string]: string | number | undefined; // Include undefined for optional existing properties
    }[];
    budgets: {
      amount: number;
      category: string;
      month: string;
      [key: string]: string | number | undefined;
    }[];
  }

const SummaryCards: React.FC<Props> = ({ transactions, budgets }) => {
  // Calculate total income (positive amounts)
  const totalIncome = transactions
  .filter(tx => tx.amount > 0)
  .reduce((sum, tx) => sum + tx.amount, 0);



  

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Income */}
      <div className="bg-red-100 p-4 shadow rounded-lg">
        <h2 className="text-lg font-semibold">Total Expenses</h2>
        <p className="text-green-600 font-bold">₹{totalIncome}</p>
      </div>

   
      <div className="bg-yellow-200 p-4 shadow rounded-lg">
        <h2 className="text-lg font-semibold">Total Budget</h2>
        <p className="text-blue-600 font-bold">₹{totalBudget}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
