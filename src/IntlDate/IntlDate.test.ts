import IntlDate from './IntlDate';

describe('IntlDate', () => {
  test('today', () => {
    const jsDate = new Date();
    const intlDate = IntlDate.today();
    expect(intlDate).toBeTruthy();

    expect(intlDate.getYear('gregorian')).toEqual(jsDate.getFullYear());
    expect(intlDate.getMonth('gregorian')).toEqual(jsDate.getMonth() + 1);
    expect(intlDate.getDay('gregorian')).toEqual(jsDate.getDate());
  });

  test('created from javascript date object', () => {
    const jsDate = new Date(2017, 11, 25);
    const intlDate = IntlDate.from(jsDate);

    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(jsDate.getFullYear());
    expect(intlDate.getMonth('gregorian')).toEqual(jsDate.getMonth() + 1);
    expect(intlDate.getDay('gregorian')).toEqual(jsDate.getDate());
  });

  test('created from a date string', () => {
    const intlDate = IntlDate.parse('gregorian', '1957-5-16');

    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(1957);
    expect(intlDate.getMonth('gregorian')).toEqual(5);
    expect(intlDate.getDay('gregorian')).toEqual(16);
  });

  test('created by gregorian input', () => {
    const intlDate = IntlDate.of('gregorian', 1957, 10, 16);
    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(1957);
    expect(intlDate.getMonth('gregorian')).toEqual(10);
    expect(intlDate.getDay('gregorian')).toEqual(16);

    expect(intlDate.getYear('islamic-umalqura')).toEqual(1377);
    expect(intlDate.getMonth('islamic-umalqura')).toEqual(3);
    expect(intlDate.getDay('islamic-umalqura')).toEqual(22);

    expect(intlDate.getYear('persian')).toEqual(1336);
    expect(intlDate.getMonth('persian')).toEqual(7);
    expect(intlDate.getDay('persian')).toEqual(24);
  });

  test('created by non-gregorian input', () => {
    const intlDate = IntlDate.of('islamic-umalqura', 1377, 3, 22);
    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(1957);
    expect(intlDate.getMonth('gregorian')).toEqual(10);
    expect(intlDate.getDay('gregorian')).toEqual(16);

    expect(intlDate.getYear('islamic-umalqura')).toEqual(1377);
    expect(intlDate.getMonth('islamic-umalqura')).toEqual(3);
    expect(intlDate.getDay('islamic-umalqura')).toEqual(22);

    expect(intlDate.getYear('persian')).toEqual(1336);
    expect(intlDate.getMonth('persian')).toEqual(7);
    expect(intlDate.getDay('persian')).toEqual(24);
  });

  test('getDayOfWeek', () => {
    const intlDate = IntlDate.of('gregorian', 1957, 10, 16);
    expect(intlDate.getDayOfWeek()).toEqual(4);
  });

  test('plus days', () => {
    const oldDate = IntlDate.of('gregorian', 1957, 10, 16);
    const newDate = oldDate.plusDays(20);

    // old shouldn't be modified
    expect(oldDate.getYear('gregorian')).toEqual(1957);
    expect(oldDate.getMonth('gregorian')).toEqual(10);
    expect(oldDate.getDay('gregorian')).toEqual(16);

    // test the new object
    expect(newDate.getYear('gregorian')).toEqual(1957);
    expect(newDate.getMonth('gregorian')).toEqual(11);
    expect(newDate.getDay('gregorian')).toEqual(5);
  });

  test('minus days', () => {
    const oldDate = IntlDate.of('gregorian', 1957, 10, 16);
    const newDate = oldDate.minusDays(20);

    // old shouldn't be modified
    expect(oldDate.getYear('gregorian')).toEqual(1957);
    expect(oldDate.getMonth('gregorian')).toEqual(10);
    expect(oldDate.getDay('gregorian')).toEqual(16);

    // test the new object
    expect(newDate.getYear('gregorian')).toEqual(1957);
    expect(newDate.getMonth('gregorian')).toEqual(9);
    expect(newDate.getDay('gregorian')).toEqual(26);
  });

  test('toString', () => {
    const intlDate = IntlDate.of('gregorian', 2022, 7, 11);
    expect(intlDate.toString('gregorian')).toEqual('2022-07-11');
  });
});
