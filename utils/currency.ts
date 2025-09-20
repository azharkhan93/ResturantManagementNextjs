/**
 * Currency formatting utilities
 */

/**
 * Formats a number as Indian Rupee currency
 * @param amount - The amount to format
 * @param options - Optional formatting options
 * @returns Formatted currency string with ₹ symbol
 */
export const formatCurrency = (
  amount: number | string,
  options: {
    showDecimals?: boolean;
    locale?: string;
  } = {}
): string => {
  const { showDecimals = false, locale = 'en-IN' } = options;
  
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) {
    return '₹0';
  }

  const formattedNumber = showDecimals 
    ? numericAmount.toLocaleString(locale, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })
    : numericAmount.toLocaleString(locale, { 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
      });

  return `₹${formattedNumber}`;
};

/**
 * Formats a number as Indian Rupee currency with decimals
 * @param amount - The amount to format
 * @returns Formatted currency string with ₹ symbol and 2 decimal places
 */
export const formatCurrencyWithDecimals = (amount: number | string): string => {
  return formatCurrency(amount, { showDecimals: true });
};

/**
 * Formats a number as Indian Rupee currency without decimals
 * @param amount - The amount to format
 * @returns Formatted currency string with ₹ symbol and no decimal places
 */
export const formatCurrencyWithoutDecimals = (amount: number | string): string => {
  return formatCurrency(amount, { showDecimals: false });
};
