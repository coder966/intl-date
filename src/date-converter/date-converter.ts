const fromGregorian = (calendarType: CalendarType, date: Date): number[] => {
  const formatted = new Intl.DateTimeFormat(`en-u-ca-${calendarType}`, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(date);

  const match = formatted.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4}) ([0-9A-Z]{1,4})/);

  if (match) {
    const y = parseInt(match[3]);
    const m = parseInt(match[1]);
    const d = parseInt(match[2]);
    return [y, m, d];
  } else {
    throw `fromGregorian: Could not parse the converted date for calendarType=${calendarType} date=${date} formatted=${formatted}`;
  }
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
