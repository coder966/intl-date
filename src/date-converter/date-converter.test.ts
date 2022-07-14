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
