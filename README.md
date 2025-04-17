This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

---

## 🧩 Components Overview

### `TransactionForm.tsx`
- Allows users to input a transaction.
- Includes fields like amount, date, description, and category.
- Uses Zod and React Hook Form for validation.

### `TransactionList.tsx`
- Displays transactions grouped by date or category.
- Supports delete/edit actions.

### `MonthlyBarChart.tsx`
- Shows income and expense totals per month using `Recharts`.

### `SummaryCards.tsx`
- Displays cards for total income, expense, and balance for the month.

### `CategoryPieChart.tsx`
- Pie chart showing expense distribution by category.

### `BudgetForm.tsx`
- Lets users set budget limits per category per month.

### `BudgetVsActualChart.tsx`
- Compares budgeted vs actual expenses in a stacked bar chart.

### `BudgetInsights.tsx`
- Displays helpful messages about overspending or savings.

---

## 🧪 Development Notes

- All components are built with **shadcn/ui** and **Tailwind CSS** for a clean and responsive UI.
- Data is fetched using **Server Components** or **API routes** (e.g., `/api/transactions`, `/api/budgets`).
- Charts use `recharts` for flexible and powerful data visualizations.
- All views auto-refresh using `useEffect` and `router.refresh()` after form actions.

---

## 🔧 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
