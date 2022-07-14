const fromGregorian = (calendarType: CalendarType, date: Date) : number[] | null => { 
  const formatted = new Intl.DateTimeFormat(
    `en-u-ca-${calendarType}`,
    { day: 'numeric', month: 'numeric', year: 'numeric' }
  ).format(date);

  const match = formatted.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4}) ([0-9A-Z]{1,4})/);

  if(match){
    const y = parseInt(match[3]);
    const m = parseInt(match[1]);
    const d = parseInt(match[2]);
    return [y, m, d];
  }else{
    console.error(`fromGregorian: Could not parse the converted date for calendarType=${calendarType} date=${date} formatted=${formatted}`)
    return null;
  }
}

const hijriToGregorianRecursive = (y: number, m: number, d: number, guess: Date, adjustDays: number) : Date | null => {
  guess.setDate(guess.getDate() + adjustDays);
  const hijriGuess = fromGregorian('islamic-umalqura', guess);

  if(hijriGuess){
    if(hijriGuess[0] === y && hijriGuess[1] === m && hijriGuess[2] === d){
      return guess; // we found it, stop
    }else{
      const approximateDays = ((y*365)+(m*30)+(d))-((hijriGuess[0]*365)+(hijriGuess[1]*30)+(hijriGuess[2]));
      return hijriToGregorianRecursive(y, m, d, guess, approximateDays);
    }  
  }else{
    return null;
  }
}

const hijriToGregorian = (y: number, m: number, d: number) : Date | null => {
  return hijriToGregorianRecursive(y, m, d, new Date(), 0);
}

export { fromGregorian, hijriToGregorian };