
export const createUTCDate = (year: number, month: number, day: number): Date => {
  const utcDate = new Date(0);
  utcDate.setUTCFullYear(year, month - 1, day);
  return utcDate;
};

export const createUTCDateFromDate = (date: Date): Date => {
  const utcDate = new Date(0);
  utcDate.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  return utcDate;
};