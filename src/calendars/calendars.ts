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

type ConversionReference = {
  date: Date;
  year: number;
  month: number;
  day: number;
};

type CalendarConfig = {
  formatter: Intl.DateTimeFormat;
  /** Fixed Gregorian date and matching calendar components used to start conversion. */
  reference: ConversionReference;
  averageDaysPerYear: number;
};

const FORMAT_OPTIONS: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };

const CALENDAR_CONFIG = {
  gregorian: {
    formatter: new Intl.DateTimeFormat('en-u-ca-gregory', FORMAT_OPTIONS),
    reference: { date: new Date(1932, 8, 23), year: 1932, month: 9, day: 23 },
    averageDaysPerYear: 365.2425,
  },
  'islamic-umalqura': {
    formatter: new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', FORMAT_OPTIONS),
    reference: { date: new Date(1932, 8, 23), year: 1351, month: 5, day: 22 },
    averageDaysPerYear: 354.3667,
  },
  'islamic-rgsa': {
    formatter: new Intl.DateTimeFormat('en-u-ca-islamic-rgsa', FORMAT_OPTIONS),
    reference: { date: new Date(1932, 8, 23), year: 1351, month: 5, day: 23 },
    averageDaysPerYear: 354.3667,
  },
  'islamic-civil': {
    formatter: new Intl.DateTimeFormat('en-u-ca-islamic-civil', FORMAT_OPTIONS),
    reference: { date: new Date(1932, 8, 23), year: 1351, month: 5, day: 22 },
    averageDaysPerYear: 354.3667,
  },
  'islamic-tbla': {
    formatter: new Intl.DateTimeFormat('en-u-ca-islamic-tbla', FORMAT_OPTIONS),
    reference: { date: new Date(1932, 8, 23), year: 1351, month: 5, day: 23 },
    averageDaysPerYear: 354.3667,
  },
  persian: {
    formatter: new Intl.DateTimeFormat('en-u-ca-persian', FORMAT_OPTIONS),
    reference: { date: new Date(1932, 8, 23), year: 1311, month: 7, day: 1 },
    averageDaysPerYear: 365.2422,
  },
} satisfies Record<string, CalendarConfig>;

type CalendarType = keyof typeof CALENDAR_CONFIG;

export { CALENDAR_CONFIG };
export type { CalendarType };
