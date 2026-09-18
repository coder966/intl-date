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

import { performance } from 'node:perf_hooks';
import { IntlDate } from './dist/index.js';

const ITERATIONS = 10_000;
const WARMUP_ITERATIONS = 2_000;

/**
 * This ensures the returned values are consumed, helping prevent the runtime from optimizing the work away
 */
let checksum = 0;

const benchmark = (name, task) => {
  for (let i = 0; i < WARMUP_ITERATIONS; i++) {
    task();
  }

  const start = performance.now();

  for (let i = 0; i < ITERATIONS; i++) {
    checksum += task();
  }

  const elapsed = performance.now() - start;
  const operationsPerSecond = (ITERATIONS / elapsed) * 1000;

  console.log(`${name.padEnd(34)} ${Math.round(operationsPerSecond).toLocaleString().padStart(14)} ops/s`);
};

const date = IntlDate.of('gregorian', 2024, 2, 29);
const laterDate = IntlDate.of('gregorian', 2025, 2, 28);

console.log(`IntlDate benchmark (${ITERATIONS.toLocaleString()} measured iterations)`);
console.log('-------------------------------------------------------');

benchmark('IntlDate.of (Gregorian)', () => {
  return IntlDate.of('gregorian', 2024, 2, 29).getDayOfWeek();
});

benchmark('IntlDate.of (Umm al-Qura)', () => {
  return IntlDate.of('islamic-umalqura', 1377, 3, 22).getDayOfWeek();
});

benchmark('IntlDate.parse', () => {
  return IntlDate.parse('gregorian', '2024-02-29').getDayOfWeek();
});

benchmark('IntlDate.getYear (gregorian)', () => {
  return date.getYear('gregorian');
});

benchmark('IntlDate.getYear (converted)', () => {
  return date.getYear('islamic-umalqura');
});

benchmark('IntlDate.format', () => {
  return date.format('islamic-umalqura', 'yyyy-MM-dd').length;
});

benchmark('IntlDate.plusDays', () => {
  return date.plusDays(1).getDayOfWeek();
});

benchmark('IntlDate.isBefore', () => {
  return date.isBefore(laterDate) ? 1 : 0;
});

console.log(`\nChecksum: ${checksum}`);
