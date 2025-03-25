export const displayAmount = (amount) =>
  `£${parseFloat(amount).toFixed(2).replace(/\.00$/, '')}`;
