import IntlDate from "./IntlDate";

describe('IntlDate', () => {

  test('basic', () => {
    const date = new IntlDate();
    expect(date).toBeTruthy();
  });

})
