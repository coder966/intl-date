const fromGregorian = (calendarType: CalendarType, date: Date): number[] => {
  const parts = new Intl.DateTimeFormat(`en-u-ca-${calendarType}`, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).formatToParts(date);

  const y = parseInt(parts.find((p) => p.type === 'year')?.value + '');
  const m = parseInt(parts.find((p) => p.type === 'month')?.value + '');
  const d = parseInt(parts.find((p) => p.type === 'day')?.value + '');

  return [y, m, d];
};

const toGregorian = (calendarType: CalendarType, y: number, m: number, d: number): Date => {
  let guess = new Date();
  let convertedGuess = fromGregorian(calendarType, guess);

  while (convertedGuess[0] !== y || convertedGuess[1] !== m || convertedGuess[2] !== d) {
    const adjustDays = y * 365 + m * 30 + d - (convertedGuess[0] * 365 + convertedGuess[1] * 30 + convertedGuess[2]);
    guess.setDate(guess.getDate() + adjustDays);
    convertedGuess = fromGregorian(calendarType, guess);
  }

  return guess;
};

export { fromGregorian, toGregorian };
