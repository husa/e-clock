export const prependZero = (digits: number): string => `${digits < 10 ? 0 : ''}${digits}`;

export const format24Hours = (use24: boolean, hours: number): number => {
  if (use24) return hours;
  if (Math.floor(hours / 12) === 0) return hours || 12;
  return hours - 12 || 12;
};
