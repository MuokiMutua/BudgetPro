import React from 'react';
import { Settings } from 'lucide-react';
import { Currency, currencies } from '../types/currency';

type Props = {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
};

export default function CurrencySelector({ currency, onCurrencyChange }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Settings className="h-4 w-4 text-gray-400" />
      <select
        value={currency.code}
        onChange={(e) => {
          const selected = currencies.find((c) => c.code === e.target.value);
          if (selected) onCurrencyChange(selected);
        }}
        className="text-sm border-none bg-transparent focus:ring-0 text-gray-400 hover:text-gray-600 cursor-pointer"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} ({c.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}