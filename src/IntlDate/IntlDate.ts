import { fromGregorian, toGregorian } from '../date-converter/date-converter';
import CalendarType from '../types/CalendarType';

/**
 * @author Khalid H. Alharisi
 */
class IntlDate {
  private jsDate: Date;
  private converted: { [key: string]: number[] } = {};
  public _int: number;

  private constructor(calendarType: CalendarType, year: number, month: number, day: number) {
    this.validateSupportedCalendarType(calendarType);
    if (calendarType === 'gregorian') {
      this.jsDate = new Date(year, month - 1, day);
    } else {
      this.converted[calendarType] = [year, month, day];
      this.jsDate = toGregorian(calendarType, year, month, day);
    }
    this._int = this.jsDate.getTime();
  }

  static of = (calendarType: CalendarType, year: number, month: number, day: number): IntlDate => {
    return new IntlDate(calendarType, year, month, day);
  };

  static from = (jsDate: Date): IntlDate => {
    return IntlDate.of('gregorian', jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
  };

  /**
   * Supports the following formats:
   * yyyy-mm-dd or yyyy-m-d
   * yyyy/mm/dd or yyyy/m/d
   * @param date date string
   */
  static parse = (calendarType: CalendarType, date: string): IntlDate => {
    if (!date || date.length > 10) {
      throw `Invalid date string ${date}`;
    }

    // extract date parts
    let parts = date.split('-');
    if (parts.length === 1) {
      parts = date.split('/');
    }
    if (parts.length != 3) {
      throw `Invalid date string ${date}`;
    }

    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    return IntlDate.of(calendarType, year, month, day);
  };

  static today = (): IntlDate => {
    return IntlDate.from(new Date());
  };

  private validateSupportedCalendarType = (calendarType: string): void => {
    switch (calendarType) {
      case 'gregorian':
      case 'islamic':
      case 'islamic-umalqura':
      case 'islamic-rgsa':
      case 'islamic-civil':
      case 'islamic-tbla':
      case 'persian':
        return;
      default:
        throw `Unsupported calendar type ${calendarType}`;
    }
  };

  private getConverted = (calendarType: CalendarType): number[] => {
    let converted = this.converted[calendarType];
    if (!converted) {
      converted = this.converted[calendarType] = fromGregorian(calendarType, this.jsDate);
    }
    return converted;
  };

  getYear = (calendarType: CalendarType): number => {
    this.validateSupportedCalendarType(calendarType);
    if (calendarType === 'gregorian') {
      return this.jsDate.getFullYear();
    } else {
      return this.getConverted(calendarType)[0];
    }
  };

  getMonth = (calendarType: CalendarType): number => {
    this.validateSupportedCalendarType(calendarType);
    if (calendarType === 'gregorian') {
      return this.jsDate.getMonth() + 1;
    } else {
      return this.getConverted(calendarType)[1];
    }
  };

  getDay = (calendarType: CalendarType): number => {
    this.validateSupportedCalendarType(calendarType);
    if (calendarType === 'gregorian') {
      return this.jsDate.getDate();
    } else {
      return this.getConverted(calendarType)[2];
    }
  };

  /**
   * Index of the day of the week (starting from 1)
   * @returns Index of the day of the week (starting from 1)
   */
  getDayOfWeek = (): number => {
    return this.jsDate.getDay() + 1;
  };

  /**
   * Index of the quarter of the year (starting from 1)
   * @returns Index of the quarter of the year (starting from 1)
   */
  getQuarter = (calendarType: CalendarType): number => {
    const month = this.getMonth(calendarType);
    return Math.floor((month - 1) / 3) + 1;
  };

  isEqual = (other: IntlDate): boolean => {
    return this._int === other._int;
  };

  isBefore = (other: IntlDate): boolean => {
    return this._int < other._int;
  };

  isAfter = (other: IntlDate): boolean => {
    return this._int > other._int;
  };

  isBetween = (start: IntlDate, end: IntlDate): boolean => {
    return (this._int > start._int && this._int < end._int) || (this._int > end._int && this._int < start._int);
  };

  static min = (date1: IntlDate, date2: IntlDate): IntlDate => {
    return date1.isBefore(date2) ? date1 : date2;
  };

  static max = (date1: IntlDate, date2: IntlDate): IntlDate => {
    return date1.isAfter(date2) ? date1 : date2;
  };

  plusDays = (days: number): IntlDate => {
    const tmp = new Date(this.jsDate);
    tmp.setDate(tmp.getDate() + days);
    return IntlDate.of('gregorian', tmp.getFullYear(), tmp.getMonth() + 1, tmp.getDate());
  };

  minusDays = (days: number): IntlDate => {
    return this.plusDays(days * -1);
  };

  toString = (calendarType: CalendarType): string => {
    this.validateSupportedCalendarType(calendarType);
    const y = this.getYear(calendarType);
    const m = this.getMonth(calendarType);
    const d = this.getDay(calendarType);
    return `${y}-${m > 9 ? m : '0' + m}-${d > 9 ? d : '0' + d}`;
  };
}

export default IntlDate;
