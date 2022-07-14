import { fromGregorian, toGregorian } from '../date-converter/date-converter';

/**
 * @author Khalid H. Alharisi
 */
class IntlDate {
  g: Date;
  converted: { [key: string]: number[] } = {};

  private constructor(calendarType: CalendarType, year: number, month: number, day: number) {
    if (calendarType === 'gregorian') {
      this.g = new Date(year, month - 1, day);
    } else {
      this.converted[calendarType] = [year, month, day];
      this.g = toGregorian(calendarType, year, month, day);
    }
  }

  static of = (calendarType: CalendarType, year: number, month: number, day: number): IntlDate => {
    return new IntlDate(calendarType, year, month, day);
  };

  static today = (): IntlDate => {
    const today = new Date();
    return new IntlDate('gregorian', today.getFullYear(), today.getMonth() + 1, today.getDate());
  };

  private getConverted = (calendarType: CalendarType): number[] => {
    let converted = this.converted[calendarType];
    if (!converted) {
      converted = this.converted[calendarType] = fromGregorian(calendarType, this.g);
    }
    return converted;
  };

  getYear = (calendarType: CalendarType): number => {
    if (calendarType === 'gregorian') {
      return this.g.getFullYear();
    } else {
      return this.getConverted(calendarType)[0];
    }
  };

  getMonth = (calendarType: CalendarType): number => {
    if (calendarType === 'gregorian') {
      return this.g.getMonth() + 1;
    } else {
      return this.getConverted(calendarType)[1];
    }
  };

  getDay = (calendarType: CalendarType): number => {
    if (calendarType === 'gregorian') {
      return this.g.getDate();
    } else {
      return this.getConverted(calendarType)[2];
    }
  };
}

export default IntlDate;
