
/**
 * Format price to Indian Rupees
 * @param price Price in USD
 * @returns Formatted price in INR
 */
export const formatPriceToINR = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price * 83); // Approximate conversion rate from USD to INR
};
