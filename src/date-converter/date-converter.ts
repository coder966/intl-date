/*
 * Copyright 2022 Khalid H. Alharisi
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

  // wipe out time information
  guess.setHours(0);
  guess.setMinutes(0);
  guess.setSeconds(0);
  guess.setMilliseconds(0);

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
