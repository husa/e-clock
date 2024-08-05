export const prependZero = (digits: number): string => `${digits < 10 ? 0 : ''}${digits}`;

export const format24Hours = (use24: boolean, hours: number) =>
  use24 || !Math.floor(hours / 13) ? hours : hours - 12;
