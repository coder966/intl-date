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

import { Bench } from 'tinybench';
import { IntlDate } from './dist/index.js';

/**
 * This ensures the returned values are consumed, helping prevent the runtime from optimizing the work away
 */
let checksum = 0;

const date = IntlDate.of('gregorian', 2024, 2, 29);
const laterDate = IntlDate.of('gregorian', 2025, 2, 28);

const bench = new Bench({
  name: 'IntlDate benchmark',
  time: 1_000,
  warmupTime: 500,
});

bench
  .add('IntlDate.of (Gregorian)', () => {
    checksum += IntlDate.of('gregorian', 2024, 2, 29).getDayOfWeek();
  })
  .add('IntlDate.of (Umm al-Qura)', () => {
    checksum += IntlDate.of('islamic-umalqura', 1377, 3, 22).getDayOfWeek();
  })
  .add('IntlDate.parse', () => {
    checksum += IntlDate.parse('gregorian', '2024-02-29').getDayOfWeek();
  })
  .add('IntlDate.getYear (gregorian)', () => {
    checksum += date.getYear('gregorian');
  })
  .add('IntlDate.getYear (converted)', () => {
    checksum += date.getYear('islamic-umalqura');
  })
  .add('IntlDate.format', () => {
    checksum += date.format('islamic-umalqura', 'yyyy-MM-dd').length;
  })
  .add('IntlDate.plusDays', () => {
    checksum += date.plusDays(1).getDayOfWeek();
  })
  .add('IntlDate.isBefore', () => {
    checksum += date.isBefore(laterDate) ? 1 : 0;
  });

await bench.run();
console.table(bench.table());

console.log(`\nChecksum: ${checksum}`);
