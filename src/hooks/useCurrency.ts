import { useState, useEffect } from 'react';
import { Currency, getDefaultCurrency } from '../types/currency';

export function useCurrency() {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('preferredCurrency');
    return saved ? JSON.parse(saved) : getDefaultCurrency();
  });

  useEffect(() => {
    localStorage.setItem('preferredCurrency', JSON.stringify(currency));
  }, [currency]);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: currency.code,
    }).format(amount);
  };

  return { currency, setCurrency, formatAmount };
}