import React from 'react';
import { Transaction } from '../App';

type Props = {
  transactions: Transaction[];
  formatAmount: (amount: number) => string;
};

function TransactionList({ transactions, formatAmount }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">All Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium">{transaction.description}</p>
                <p className={`font-semibold ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                </p>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <p>{transaction.category}</p>
                <p>{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
        {transactions.length === 0 && (
          <p className="text-gray-500 text-center py-4">No transactions yet</p>
        )}
      </div>
    </div>
  );
}

export default TransactionList;