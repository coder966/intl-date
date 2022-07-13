import { gregorianToHijri, hijriToGregorian } from "../hijri/hijri";

/**
 * @author Khalid H. Alharisi
 */
class IntlDate {

  calendarType: CalendarType;
  g: Date;
  h: number[];

  private constructor(calendarType: CalendarType, year: number, month: number, day: number) {
    this.calendarType = calendarType;
    if (calendarType === 'gregorian') {
      this.g = new Date(year, month - 1, day);
      const converted = gregorianToHijri(this.g);
      if (!converted) {
        throw 'Invalid Date. Original Date object = '+this.g;
      }
      this.h = converted;
    } else {
      this.h = [year, month, day];
      const converted = hijriToGregorian(year, month, day);
      if (!converted) {
        throw 'Invalid Date. Original number[] = '+this.h;
      }
      this.g = converted;
    }
  }

  static of = (calendarType: CalendarType, year: number, month: number, day: number) : IntlDate => {
    return new IntlDate(calendarType, year, month, day);
  }

  static today = () : IntlDate => {
    const today = new Date();
    return new IntlDate('gregorian', today.getFullYear(), today.getMonth() + 1, today.getDate());
  }

  getYear = (calendarType: CalendarType) : number => {
    if (calendarType === 'gregorian') {
      return this.g.getFullYear();
    } else {
      return this.h[0];
    }
  }

  getMonth = (calendarType: CalendarType) : number => {
    if (calendarType === 'gregorian') {
      return this.g.getMonth() + 1;
    } else {
      return this.h[1];
    }
  }

  getDay = (calendarType: CalendarType) : number => {
    if (calendarType === 'gregorian') {
      return this.g.getDate();
    } else {
      return this.h[2];
    }
  }

}

export default IntlDate;

