import React from 'react';
import { Transaction } from '../App';

type Props = {
  transactions: Transaction[];
  formatAmount: (amount: number) => string;
};

function BudgetOverview({ transactions, formatAmount }: Props) {
  const categories = [...new Set(transactions.map(t => t.category))];
  
  const categoryTotals = categories.map(category => {
    const total = transactions
      .filter(t => t.category === category && t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
    return { category, total };
  }).sort((a, b) => b.total - a.total);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
      <div className="space-y-4">
        {categoryTotals.map(({ category, total }) => {
          const percentage = totalExpenses ? (total / totalExpenses) * 100 : 0;
          return (
            <div key={category}>
              <div className="flex justify-between text-sm mb-1">
                <span>{category}</span>
                <span className="font-medium">{formatAmount(total)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
        {transactions.length === 0 && (
          <p className="text-gray-500 text-center py-4">No expenses yet</p>
        )}
      </div>
    </div>
  );
}

export default BudgetOverview;