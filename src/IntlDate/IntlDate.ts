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
    this.validateSupportedCalendarType(calendarType);
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

  daysUntil = (other: IntlDate): number => {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    return Math.ceil((other._int - this._int) / MS_PER_DAY);
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

  /**
   * Returns the date in the specified calendar formatted according to provided format string.
   *
   * Supports the following tokens:
   * - yyyy: four digit year
   * - yy: two digit year
   * - y: year without padding
   * - MM: month padded to 2 digits
   * - M: month without padding
   * - dd: day padded to 2 digits
   * - d: day without padding
   *
   */
  format = (calendarType: CalendarType, pattern: string): string => {
    this.validateSupportedCalendarType(calendarType);

    const year = this.getYear(calendarType).toString();
    const month = this.getMonth(calendarType).toString();
    const day = this.getDay(calendarType).toString();

    return pattern
      .replace(/yyyy/g, year.padStart(4, '0'))
      .replace(/yy/g, year.slice(-2).padStart(2, '0'))
      .replace(/y/g, year)
      .replace(/MM/g, month.padStart(2, '0'))
      .replace(/M/g, month)
      .replace(/dd/g, day.padStart(2, '0'))
      .replace(/d/g, day);
  };

  /**
   * Same as calling format(calendarType, 'yyyy-MM-dd')
   */
  toString = (calendarType: CalendarType): string => {
    this.validateSupportedCalendarType(calendarType);
    return this.format(calendarType, 'yyyy-MM-dd');
  };
}

export default IntlDate;
