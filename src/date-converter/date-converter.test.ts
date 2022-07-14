import benchmark from "../benchmark";
import { gregorianToHijri, hijriToGregorian } from "./date-converter";

describe('hijri', () => {

  test('gregorianToHijri: past date', () => {
    const output = gregorianToHijri(new Date('1957-10-16'));
    expect(output).toBeTruthy();
    expect(output).toEqual([1377, 3, 22]);
  });

  test('gregorianToHijri: future date', () => {
    const output = gregorianToHijri(new Date('2060-06-11'));
    expect(output).toBeTruthy();
    expect(output).toEqual([1483, 1, 12]);
  });


  test('hijriToGregorian: past date', () => {
    const output = hijriToGregorian(1377, 3, 22);
    expect(output).toBeTruthy();
    if(output){
      expect(output.getFullYear()).toEqual(1957);
      expect(output.getMonth()+1).toEqual(10);
      expect(output.getDate()).toEqual(16);  
    }
  });

  test('hijriToGregorian: future date', () => {
    const output = hijriToGregorian(1483, 1, 12);
    expect(output).toBeTruthy();
    if(output){
      expect(output.getFullYear()).toEqual(2060);
      expect(output.getMonth()+1).toEqual(6);
      expect(output.getDate()).toEqual(11);  
    }
  });

  test('perf: gregorianToHijri throughput', () => {
    const input = new Date('1957-10-16');
    benchmark('gregorianToHijri', 1000, () => {
      gregorianToHijri(input);
    });
  });

  test('perf: hijriToGregorian throughput', () => {
    benchmark('gregorianToHijri', 1000, () => {
      hijriToGregorian(1377, 3, 22);
    });
  });

})
