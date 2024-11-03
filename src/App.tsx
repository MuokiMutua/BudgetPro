import React, { useState } from 'react';
import { Wallet, PieChart, TrendingUp, DollarSign, Plus } from 'lucide-react';
import ExpenseForm from './components/ExpenseForm';
import Dashboard from './components/Dashboard';
import BudgetOverview from './components/BudgetOverview';
import TransactionList from './components/TransactionList';
import CurrencySelector from './components/CurrencySelector';
import { useCurrency } from './hooks/useCurrency';

export type Transaction = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
};

function App() {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { currency, setCurrency, formatAmount } = useCurrency();

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions([...transactions, { ...transaction, id: crypto.randomUUID() }]);
    setShowExpenseForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg">
              <Wallet className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="text-xl font-bold tracking-tight">BudgetPro</span>
          </div>
          <div className="flex items-center space-x-4">
            <CurrencySelector currency={currency} onCurrencyChange={setCurrency} />
            <button
              onClick={() => setShowExpenseForm(true)}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Balance</p>
              <p className="text-2xl font-semibold">
                {formatAmount(transactions.reduce((acc, curr) => 
                  curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0
                ))}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Income</p>
              <p className="text-2xl font-semibold">
                {formatAmount(transactions
                  .filter(t => t.type === 'income')
                  .reduce((acc, curr) => acc + curr.amount, 0)
                )}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <PieChart className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Expenses</p>
              <p className="text-2xl font-semibold">
                {formatAmount(transactions
                  .filter(t => t.type === 'expense')
                  .reduce((acc, curr) => acc + curr.amount, 0)
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Dashboard transactions={transactions} formatAmount={formatAmount} />
            <TransactionList transactions={transactions} formatAmount={formatAmount} />
          </div>
          <div>
            <BudgetOverview transactions={transactions} formatAmount={formatAmount} />
          </div>
        </div>
      </main>

      {showExpenseForm && (
        <ExpenseForm 
          onClose={() => setShowExpenseForm(false)}
          onSubmit={addTransaction}
          currency={currency}
        />
      )}
    </div>
  );
}

export default App;