export const prependZero = digits => `${digits < 10 ? 0 : ''}${digits}`;

export const format24Hours = (use24, hours) => use24 || !Math.floor(hours / 13) ? hours : hours - 12;
