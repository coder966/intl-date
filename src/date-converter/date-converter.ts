const gregorianToHijri = (date: Date) : number[] | null => {
  const formatted = new Intl.DateTimeFormat(
    'en-SA-u-ca-islamic-umalqura',
    { day: 'numeric', month: 'numeric', year: 'numeric' }
  ).format(date);

  const match = formatted.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4}) AH/);

  if(match){
    const ry = parseInt(match[3]);
    const rm = parseInt(match[1]);
    const rd = parseInt(match[2]);
    return [ry, rm, rd];
  }else{
    console.error(`gregorianToHijri null situation. date=${date} formatted=${formatted}`)
    return null;
  }
}

const hijriToGregorianRecursive = (y: number, m: number, d: number, guess: Date, adjustDays: number) : Date | null => {
  guess.setDate(guess.getDate() + adjustDays);
  const hijriGuess = gregorianToHijri(guess);

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

export { gregorianToHijri, hijriToGregorian };
