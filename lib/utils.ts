import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// transaction type 
type Transaction = {
    category?: string
    amount: number
  }
export function getCategoryData(transactions: Transaction[]) {
    const categoryMap: { [key: string]: number } = {};
  
    transactions.forEach((tx) => {
      const cat = tx.category || 'Uncategorized';
      categoryMap[cat] = (categoryMap[cat] || 0) + tx.amount;
    });
  
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  }
  

