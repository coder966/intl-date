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

import { describe, test, expect } from '@jest/globals';
import { fromGregorian, toGregorian } from './converters';
import type { CalendarType } from '../calendars/calendars';

const supportedCalendarTypes: CalendarType[] = [
  'gregorian',
  'islamic-umalqura',
  'islamic-rgsa',
  'islamic-civil',
  'islamic-tbla',
  'persian',
];

describe('converters', () => {
  test('fromGregorian: past date', () => {
    const output = fromGregorian('islamic-umalqura', new Date(1957, 9, 16));
    expect(output).toBeTruthy();
    expect(output).toEqual([1377, 3, 22]);
  });

  test('fromGregorian: future date', () => {
    const output = fromGregorian('islamic-umalqura', new Date(2060, 5, 11));
    expect(output).toBeTruthy();
    expect(output).toEqual([1483, 1, 12]);
  });

  test('toGregorian: past date', () => {
    const output = toGregorian('islamic-umalqura', 1377, 3, 22);
    expect(output).toBeTruthy();
    expect(output.getFullYear()).toEqual(1957);
    expect(output.getMonth() + 1).toEqual(10);
    expect(output.getDate()).toEqual(16);
  });

  test('toGregorian: future date', () => {
    const output = toGregorian('islamic-umalqura', 1483, 1, 12);
    expect(output).toBeTruthy();
    expect(output.getFullYear()).toEqual(2060);
    expect(output.getMonth() + 1).toEqual(6);
    expect(output.getDate()).toEqual(11);
  });

  test('round-trips boundary dates for every supported calendar', () => {
    const dates = [
      new Date(1999, 11, 31),
      new Date(2000, 1, 29),
      new Date(2024, 1, 29),
      new Date(2099, 11, 31),
    ];

    for (const calendarType of supportedCalendarTypes) {
      for (const input of dates) {
        const [year, month, day] = fromGregorian(calendarType, input);
        const output = toGregorian(calendarType, year, month, day);

        expect([output.getFullYear(), output.getMonth() + 1, output.getDate()]).toEqual([
          input.getFullYear(),
          input.getMonth() + 1,
          input.getDate(),
        ]);
      }
    }
  });

  test('rejects unsupported calendar types', () => {
    expect(() => fromGregorian('unsupported' as CalendarType, new Date(2024, 1, 29))).toThrow();
  });

  test('rejects nonexistent days instead of normalizing them', () => {
    for (const day of [0, -1, 32]) {
      expect(() => toGregorian('gregorian', 2024, 2, day)).toThrow();
    }
    expect(() => toGregorian('gregorian', 2023, 2, 29)).toThrow();
  });

  test('returns local midnight', () => {
    const result = toGregorian('gregorian', 1997, 1, 2);
    expect([result.getFullYear(), result.getMonth(), result.getDate()]).toEqual([1997, 0, 2]);
    expect([result.getHours(), result.getMinutes(), result.getSeconds(), result.getMilliseconds()]).toEqual([0, 0, 0, 0]);
  });

});
