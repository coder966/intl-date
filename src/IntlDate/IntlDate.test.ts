import IntlDate from "./IntlDate";

describe('IntlDate', () => {

  test('gregorian past date', () => {
    const intlDate = IntlDate.of('gregorian', 1957, 10, 16);
    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(1957);
    expect(intlDate.getMonth('gregorian')).toEqual(10);
    expect(intlDate.getDay('gregorian')).toEqual(16);
    expect(intlDate.getYear('hijri')).toEqual(1377);
    expect(intlDate.getMonth('hijri')).toEqual(3);
    expect(intlDate.getDay('hijri')).toEqual(22);
  });

  test('gregorian future date', () => {
    const intlDate = IntlDate.of('gregorian', 2060, 6, 11);
    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(2060);
    expect(intlDate.getMonth('gregorian')).toEqual(6);
    expect(intlDate.getDay('gregorian')).toEqual(11);
    expect(intlDate.getYear('hijri')).toEqual(1483);
    expect(intlDate.getMonth('hijri')).toEqual(1);
    expect(intlDate.getDay('hijri')).toEqual(12);
  });


  test('hijri past date', () => {
    const intlDate = IntlDate.of('hijri', 1377, 3, 22);
    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(1957);
    expect(intlDate.getMonth('gregorian')).toEqual(10);
    expect(intlDate.getDay('gregorian')).toEqual(16);
    expect(intlDate.getYear('hijri')).toEqual(1377);
    expect(intlDate.getMonth('hijri')).toEqual(3);
    expect(intlDate.getDay('hijri')).toEqual(22);
  });

  test('hijri future date', () => {
    const intlDate = IntlDate.of('hijri', 1483, 1, 12);
    expect(intlDate).toBeTruthy();
    expect(intlDate.getYear('gregorian')).toEqual(2060);
    expect(intlDate.getMonth('gregorian')).toEqual(6);
    expect(intlDate.getDay('gregorian')).toEqual(11);
    expect(intlDate.getYear('hijri')).toEqual(1483);
    expect(intlDate.getMonth('hijri')).toEqual(1);
    expect(intlDate.getDay('hijri')).toEqual(12);
  });


})
