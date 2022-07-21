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

const benchmark = (name: string, cycles: number, task: () => void): void => {
  const t0 = Date.now();
  for (let i = 0; i < cycles; i++) {
    task();
  }
  const t1 = Date.now();
  console.log(`Executed ${name} ${cycles.toLocaleString()} times in ${(t1 - t0).toLocaleString()} ms`);
};

export default benchmark;
