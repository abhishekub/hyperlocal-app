export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', { // Adjusted to standard locale formats, use 'en-US' for USD
    style: 'currency',
    currency: 'INR', 
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};