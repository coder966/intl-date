import { fromGregorian, toGregorian } from '../date-converter/date-converter';

/**
 * @author Khalid H. Alharisi
 */
class IntlDate {
  jsDate: Date;
  converted: { [key: string]: number[] } = {};

  private constructor(calendarType: CalendarType, year: number, month: number, day: number) {
    this.validateSupportedCalendarType(calendarType);
    if (calendarType === 'gregorian') {
      this.jsDate = new Date(year, month - 1, day);
    } else {
      this.converted[calendarType] = [year, month, day];
      this.jsDate = toGregorian(calendarType, year, month, day);
    }
  }

  static of = (calendarType: CalendarType, year: number, month: number, day: number): IntlDate => {
    return new IntlDate(calendarType, year, month, day);
  };

  static today = (): IntlDate => {
    const today = new Date();
    return new IntlDate('gregorian', today.getFullYear(), today.getMonth() + 1, today.getDate());
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
}

export default IntlDate;
