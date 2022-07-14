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
});
