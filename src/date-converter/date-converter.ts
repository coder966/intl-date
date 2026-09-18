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

import type CalendarType from '../types/CalendarType';

const MAX_ITERATIONS = 50;
const FORMATTERS = new Map<CalendarType, Intl.DateTimeFormat>();

/**
 * @author Khalid H. Alharisi
 */
const getFormatter = (calendarType: CalendarType): Intl.DateTimeFormat => {
  let formatter = FORMATTERS.get(calendarType);

  if (!formatter) {
    const intlCalendarType = calendarType === 'gregorian' ? 'gregory' : calendarType;
    formatter = new Intl.DateTimeFormat(`en-u-ca-${intlCalendarType}`, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    FORMATTERS.set(calendarType, formatter);
  }

  return formatter;
};

/**
 * @author Khalid H. Alharisi
 */
const fromGregorian = (calendarType: CalendarType, date: Date): number[] => {
  let year = Number.NaN;
  let month = Number.NaN;
  let day = Number.NaN;

  const parts = getFormatter(calendarType).formatToParts(date);

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

type ConversionReference = {
  date: Date;
  year: number;
  month: number;
  day: number;
};

const CONVERSION_REFERENCES = new Map<CalendarType, ConversionReference>();

/**
 * Returns a cached reference point for converting dates from the specified
 * calendar to Gregorian. The reference contains today's date at midnight and
 * its corresponding year, month, and day in the requested calendar. It is
 * used as the initial guess for the iterative conversion in `toGregorian`.
 *
 * This is to have a good start. The date itself does not matter.
 *
 * Instead of having a static lookup map, we do this on the fly, so that we are dynamic and don't forget a calendar.
 * The reference is calculated by starting with a Gregorian date and converting it to the required calendar,
 * which is trivial.
 *
 * @author Khalid H. Alharisi
 */
const getConversionReference = (calendarType: CalendarType): ConversionReference => {
  let reference = CONVERSION_REFERENCES.get(calendarType);

  if (!reference) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    const converted = fromGregorian(calendarType, date);

    reference = {
      date: date,
      year: converted[0],
      month: converted[1],
      day: converted[2],
    };

    CONVERSION_REFERENCES.set(calendarType, reference);
  }

  return reference;
};

/**
 * @author Khalid H. Alharisi
 */
const toGregorian = (calendarType: CalendarType, y: number, m: number, d: number): Date => {
  const reference = getConversionReference(calendarType);
  const guess = new Date(reference.date);

  let convertedGuess = [reference.year, reference.month, reference.day];
  let iteration = 0;

  do {
    const adjustDays = y * 365 + m * 30 + d - (convertedGuess[0] * 365 + convertedGuess[1] * 30 + convertedGuess[2]);
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
