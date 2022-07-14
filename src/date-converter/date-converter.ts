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

const hijriToGregorian = (y: number, m: number, d: number): Date => {
  let guess = new Date();
  let hijriGuess = fromGregorian('islamic-umalqura', guess);

  while (hijriGuess[0] !== y || hijriGuess[1] !== m || hijriGuess[2] !== d) {
    const adjustDays = y * 365 + m * 30 + d - (hijriGuess[0] * 365 + hijriGuess[1] * 30 + hijriGuess[2]);
    guess.setDate(guess.getDate() + adjustDays);
    hijriGuess = fromGregorian('islamic-umalqura', guess);
  }

  return guess;
};

export { fromGregorian, hijriToGregorian };
