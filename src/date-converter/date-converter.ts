import CalendarType from '../types/CalendarType';

const MAX_ITERATIONS = 50;

/**
 * @author Khalid H. Alharisi
 */
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

/**
 * @author Khalid H. Alharisi
 */
const toGregorian = (calendarType: CalendarType, y: number, m: number, d: number): Date => {
  let guess = new Date();
  let convertedGuess = fromGregorian(calendarType, guess);

  let iterations = 0;
  while (convertedGuess[0] !== y || convertedGuess[1] !== m || convertedGuess[2] !== d) {
    iterations++;
    if (iterations > MAX_ITERATIONS) {
      throw `toGregorian: Could not find a conversion within the defined max iterations limit.`;
    }

    const adjustDays = y * 365 + m * 30 + d - (convertedGuess[0] * 365 + convertedGuess[1] * 30 + convertedGuess[2]);
    guess.setDate(guess.getDate() + adjustDays);
    convertedGuess = fromGregorian(calendarType, guess);
  }

  return guess;
};

export { fromGregorian, toGregorian };
