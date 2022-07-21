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

import IntlDate from './IntlDate';

describe('IntlDate', () => {
  test('today', () => {
    const jsDate = new Date();
    const intlDate = IntlDate.today();
    expect(intlDate).toBeTruthy();

    expect(intlDate.getYear('gregorian')).toEqual(jsDate.getFullYear());
    expect(intlDate.getMonth('gregorian')).toEqual(jsDate.getMonth() + 1);
    expect(intlDate.getDay('gregorian')).toEqual(jsDate.getDate());
  });

  test('created from javascript date object', () => {
    const jsDate = new Date(2017, 11, 25);
    const intlDate = IntlDate.from(jsDate);

    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(jsDate.getFullYear());
    expect(intlDate.getMonth('gregorian')).toEqual(jsDate.getMonth() + 1);
    expect(intlDate.getDay('gregorian')).toEqual(jsDate.getDate());
  });

  test('created from a date string', () => {
    const intlDate = IntlDate.parse('gregorian', '1957-5-16');

    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(1957);
    expect(intlDate.getMonth('gregorian')).toEqual(5);
    expect(intlDate.getDay('gregorian')).toEqual(16);
  });

  test('created by gregorian input', () => {
    const intlDate = IntlDate.of('gregorian', 1957, 10, 16);
    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(1957);
    expect(intlDate.getMonth('gregorian')).toEqual(10);
    expect(intlDate.getDay('gregorian')).toEqual(16);

    expect(intlDate.getYear('islamic-umalqura')).toEqual(1377);
    expect(intlDate.getMonth('islamic-umalqura')).toEqual(3);
    expect(intlDate.getDay('islamic-umalqura')).toEqual(22);

    expect(intlDate.getYear('persian')).toEqual(1336);
    expect(intlDate.getMonth('persian')).toEqual(7);
    expect(intlDate.getDay('persian')).toEqual(24);
  });

  test('created by non-gregorian input', () => {
    const intlDate = IntlDate.of('islamic-umalqura', 1377, 3, 22);
    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(1957);
    expect(intlDate.getMonth('gregorian')).toEqual(10);
    expect(intlDate.getDay('gregorian')).toEqual(16);

    expect(intlDate.getYear('islamic-umalqura')).toEqual(1377);
    expect(intlDate.getMonth('islamic-umalqura')).toEqual(3);
    expect(intlDate.getDay('islamic-umalqura')).toEqual(22);

    expect(intlDate.getYear('persian')).toEqual(1336);
    expect(intlDate.getMonth('persian')).toEqual(7);
    expect(intlDate.getDay('persian')).toEqual(24);
  });

  test('getDayOfWeek', () => {
    const intlDate = IntlDate.of('gregorian', 1957, 10, 16);
    expect(intlDate.getDayOfWeek()).toEqual(4);
  });

  test('getQuarter', () => {
    const jan = IntlDate.of('gregorian', 2022, 1, 1);
    expect(jan.getQuarter('gregorian')).toEqual(1);

    const feb = IntlDate.of('gregorian', 2022, 2, 1);
    expect(feb.getQuarter('gregorian')).toEqual(1);

    const mar = IntlDate.of('gregorian', 2022, 3, 1);
    expect(mar.getQuarter('gregorian')).toEqual(1);

    const apr = IntlDate.of('gregorian', 2022, 4, 1);
    expect(apr.getQuarter('gregorian')).toEqual(2);

    const may = IntlDate.of('gregorian', 2022, 5, 1);
    expect(may.getQuarter('gregorian')).toEqual(2);

    const jun = IntlDate.of('gregorian', 2022, 6, 1);
    expect(jun.getQuarter('gregorian')).toEqual(2);

    const jul = IntlDate.of('gregorian', 2022, 7, 1);
    expect(jul.getQuarter('gregorian')).toEqual(3);

    const aug = IntlDate.of('gregorian', 2022, 8, 1);
    expect(aug.getQuarter('gregorian')).toEqual(3);

    const sep = IntlDate.of('gregorian', 2022, 9, 1);
    expect(sep.getQuarter('gregorian')).toEqual(3);

    const oct = IntlDate.of('gregorian', 2022, 10, 1);
    expect(oct.getQuarter('gregorian')).toEqual(4);

    const nov = IntlDate.of('gregorian', 2022, 11, 1);
    expect(nov.getQuarter('gregorian')).toEqual(4);

    const dec = IntlDate.of('gregorian', 2022, 12, 1);
    expect(dec.getQuarter('gregorian')).toEqual(4);
  });

  test('plus days', () => {
    const oldDate = IntlDate.of('gregorian', 1957, 10, 16);
    const newDate = oldDate.plusDays(20);

    // old shouldn't be modified
    expect(oldDate.getYear('gregorian')).toEqual(1957);
    expect(oldDate.getMonth('gregorian')).toEqual(10);
    expect(oldDate.getDay('gregorian')).toEqual(16);

    // test the new object
    expect(newDate.getYear('gregorian')).toEqual(1957);
    expect(newDate.getMonth('gregorian')).toEqual(11);
    expect(newDate.getDay('gregorian')).toEqual(5);
  });

  test('isEqual', () => {
    const date1 = IntlDate.of('gregorian', 1957, 10, 16);
    const date2 = IntlDate.of('islamic-umalqura', 1377, 3, 22);
    expect(date1.isEqual(date2)).toEqual(true);

    const date3 = IntlDate.of('gregorian', 1957, 10, 16);
    const date4 = IntlDate.of('islamic-umalqura', 1377, 3, 23);
    expect(date3.isEqual(date4)).toEqual(false);
  });

  test('isBefore', () => {
    const date1 = IntlDate.of('gregorian', 1957, 10, 15);
    const date2 = IntlDate.of('islamic-umalqura', 1377, 3, 22);
    expect(date1.isBefore(date2)).toEqual(true);

    const date3 = IntlDate.of('gregorian', 1957, 10, 17);
    const date4 = IntlDate.of('islamic-umalqura', 1377, 3, 22);
    expect(date3.isBefore(date4)).toEqual(false);
  });

  test('isAfter', () => {
    const date1 = IntlDate.of('gregorian', 1957, 10, 17);
    const date2 = IntlDate.of('islamic-umalqura', 1377, 3, 22);
    expect(date1.isAfter(date2)).toEqual(true);

    const date3 = IntlDate.of('gregorian', 1957, 10, 15);
    const date4 = IntlDate.of('islamic-umalqura', 1377, 3, 22);
    expect(date3.isAfter(date4)).toEqual(false);
  });

  test('isBetween', () => {
    const date1 = IntlDate.of('gregorian', 1957, 10, 16);
    const date2 = IntlDate.of('gregorian', 1957, 10, 20);
    const date3 = IntlDate.of('gregorian', 1957, 10, 25);
    expect(date2.isBetween(date1, date3)).toEqual(true);

    const date4 = IntlDate.of('gregorian', 1957, 10, 16);
    const date5 = IntlDate.of('gregorian', 1957, 11, 20);
    const date6 = IntlDate.of('gregorian', 1957, 10, 25);
    expect(date5.isBetween(date4, date6)).toEqual(false);
  });

  test('daysUntil', () => {
    const date1 = IntlDate.of('gregorian', 1957, 10, 16);
    const date2 = IntlDate.of('gregorian', 1957, 11, 20);

    expect(date1.daysUntil(date1)).toEqual(0);
    expect(date1.daysUntil(date2)).toEqual(35);
    expect(date2.daysUntil(date1)).toEqual(-35);
  });

  test('min', () => {
    const date1 = IntlDate.of('gregorian', 1957, 10, 16);
    const date2 = IntlDate.of('gregorian', 1957, 10, 20);
    expect(IntlDate.min(date1, date2)).toEqual(date1);
  });

  test('max', () => {
    const date1 = IntlDate.of('gregorian', 1957, 10, 16);
    const date2 = IntlDate.of('gregorian', 1957, 10, 20);
    expect(IntlDate.max(date1, date2)).toEqual(date2);
  });

  test('minus days', () => {
    const oldDate = IntlDate.of('gregorian', 1957, 10, 16);
    const newDate = oldDate.minusDays(20);

    // old shouldn't be modified
    expect(oldDate.getYear('gregorian')).toEqual(1957);
    expect(oldDate.getMonth('gregorian')).toEqual(10);
    expect(oldDate.getDay('gregorian')).toEqual(16);

    // test the new object
    expect(newDate.getYear('gregorian')).toEqual(1957);
    expect(newDate.getMonth('gregorian')).toEqual(9);
    expect(newDate.getDay('gregorian')).toEqual(26);
  });

  test('format', () => {
    const intlDate = IntlDate.of('gregorian', 2022, 7, 11);
    expect(intlDate.format('gregorian', 'yyyy-MM/dd')).toEqual('2022-07/11');
  });

  test('toString', () => {
    const intlDate = IntlDate.of('gregorian', 2022, 7, 11);
    expect(intlDate.toString('gregorian')).toEqual('2022-07-11');
  });
});
