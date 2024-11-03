import React from 'react';
import { Transaction } from '../App';

type Props = {
  transactions: Transaction[];
  formatAmount: (amount: number) => string;
};

function Dashboard({ transactions, formatAmount }: Props) {
  const recentTransactions = transactions.slice(-5).reverse();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium">{transaction.description}</p>
              <p className="text-sm text-gray-500">{transaction.category}</p>
            </div>
            <p className={`font-semibold ${
              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
            </p>
          </div>
        ))}
        {transactions.length === 0 && (
          <p className="text-gray-500 text-center py-4">No transactions yet</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;