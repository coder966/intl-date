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

import benchmark from '../benchmark';
import { fromGregorian, toGregorian } from './date-converter';

describe('date-converter', () => {
  test('fromGregorian: past date', () => {
    const output = fromGregorian('islamic-umalqura', new Date('1957-10-16'));
    expect(output).toBeTruthy();
    expect(output).toEqual([1377, 3, 22]);
  });

  test('fromGregorian: future date', () => {
    const output = fromGregorian('islamic-umalqura', new Date('2060-06-11'));
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

  test('perf: fromGregorian throughput', () => {
    const input = new Date('1957-10-16');
    benchmark('fromGregorian', 1000, () => {
      fromGregorian('islamic-umalqura', input);
    });
  });

  test('perf: toGregorian throughput', () => {
    benchmark('toGregorian', 1000, () => {
      toGregorian('islamic-umalqura', 1377, 3, 22);
    });
  });
});
