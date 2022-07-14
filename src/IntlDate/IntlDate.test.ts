import IntlDate from "./IntlDate";

describe('IntlDate', () => {

  test('today', () => {
    const jsDate = new Date();
    const intlDate = IntlDate.today();
    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(jsDate.getFullYear());
    expect(intlDate.getMonth('gregorian')).toEqual(jsDate.getMonth()+1);
    expect(intlDate.getDay('gregorian')).toEqual(jsDate.getDate());
  });

  test('gregorian past date', () => {
    const intlDate = IntlDate.of('gregorian', 1957, 10, 16);
    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(1957);
    expect(intlDate.getMonth('gregorian')).toEqual(10);
    expect(intlDate.getDay('gregorian')).toEqual(16);
    expect(intlDate.getYear('islamic-umalqura')).toEqual(1377);
    expect(intlDate.getMonth('islamic-umalqura')).toEqual(3);
    expect(intlDate.getDay('islamic-umalqura')).toEqual(22);
  });

  test('gregorian future date', () => {
    const intlDate = IntlDate.of('gregorian', 2060, 6, 11);
    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(2060);
    expect(intlDate.getMonth('gregorian')).toEqual(6);
    expect(intlDate.getDay('gregorian')).toEqual(11);
    expect(intlDate.getYear('islamic-umalqura')).toEqual(1483);
    expect(intlDate.getMonth('islamic-umalqura')).toEqual(1);
    expect(intlDate.getDay('islamic-umalqura')).toEqual(12);
  });


  test('islamic-umalqura past date', () => {
    const intlDate = IntlDate.of('islamic-umalqura', 1377, 3, 22);
    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(1957);
    expect(intlDate.getMonth('gregorian')).toEqual(10);
    expect(intlDate.getDay('gregorian')).toEqual(16);
    expect(intlDate.getYear('islamic-umalqura')).toEqual(1377);
    expect(intlDate.getMonth('islamic-umalqura')).toEqual(3);
    expect(intlDate.getDay('islamic-umalqura')).toEqual(22);
  });

  test('islamic-umalqura future date', () => {
    const intlDate = IntlDate.of('islamic-umalqura', 1483, 1, 12);
    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(2060);
    expect(intlDate.getMonth('gregorian')).toEqual(6);
    expect(intlDate.getDay('gregorian')).toEqual(11);
    expect(intlDate.getYear('islamic-umalqura')).toEqual(1483);
    expect(intlDate.getMonth('islamic-umalqura')).toEqual(1);
    expect(intlDate.getDay('islamic-umalqura')).toEqual(12);
  });


})
