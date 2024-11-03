export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
];

export const getDefaultCurrency = (): Currency => {
  try {
    const userLocale = navigator.language;
    const userCurrency = new Intl.NumberFormat(userLocale, {
      style: 'currency',
      currency: 'USD',
    }).resolvedOptions().currency;
    
    return (
      currencies.find((c) => c.code === userCurrency) ||
      currencies.find((c) => c.code === 'USD')!
    );
  } catch {
    return currencies.find((c) => c.code === 'USD')!;
  }
};