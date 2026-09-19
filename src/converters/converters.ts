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

import { CALENDAR_CONFIG, type CalendarType } from '../calendars/calendars';

const MAX_ITERATIONS = 50;

/**
 * @author Khalid H. Alharisi
 */
const fromGregorian = (calendarType: CalendarType, date: Date): number[] => {
  let year = Number.NaN;
  let month = Number.NaN;
  let day = Number.NaN;

  const parts = CALENDAR_CONFIG[calendarType].formatter.formatToParts(date);

  for (const part of parts) {
    switch (part.type) {
      case 'year':
        year = parseInt(part.value);
        break;
      case 'month':
        month = parseInt(part.value);
        break;
      case 'day':
        day = parseInt(part.value);
        break;
    }
  }

  return [year, month, day];
};

/**
 * @author Khalid H. Alharisi
 */
const toGregorian = (calendarType: CalendarType, y: number, m: number, d: number): Date => {
  const daysPerYear = CALENDAR_CONFIG[calendarType].averageDaysPerYear;
  const daysPerMonth = daysPerYear / 12;

  const reference = CALENDAR_CONFIG[calendarType].reference;
  const guess = new Date(reference.date);
  let convertedGuess = [reference.year, reference.month, reference.day];

  let iteration = 0;

  do {
    let adjustDays = Math.round(
      (y - convertedGuess[0]) * daysPerYear +
      (m - convertedGuess[1]) * daysPerMonth +
      (d - convertedGuess[2]),
    );

    // Ensure rounding does not stall the conversion near a month or year boundary.
    const comparison = convertedGuess[0] - y || convertedGuess[1] - m || convertedGuess[2] - d;
    if (adjustDays === 0 && comparison !== 0) {
      adjustDays = comparison < 0 ? 1 : -1;
    }

    guess.setDate(guess.getDate() + adjustDays);
    convertedGuess = fromGregorian(calendarType, guess);

    if (convertedGuess[0] === y && convertedGuess[1] === m && convertedGuess[2] === d) {
      break;
    }

    iteration++;
    if (iteration > MAX_ITERATIONS) {
      throw `toGregorian: Could not find a conversion within the defined max iterations limit.`;
    }
  } while (true);

  return guess;
};

export { fromGregorian, toGregorian };
