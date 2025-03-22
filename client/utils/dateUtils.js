export const formattedDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB');
};
