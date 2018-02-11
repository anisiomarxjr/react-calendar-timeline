'use strict';

var _calendar = require('../../../utility/calendar');

//what value do these tests have? :)
describe('getNextUnit', function () {
  it('second to minute', function () {
    var result = (0, _calendar.getNextUnit)('second');
    expect(result).toBe('minute');
  });
  it('minute to hour', function () {
    var result = (0, _calendar.getNextUnit)('minute');
    expect(result).toBe('hour');
  });
  it('hour to day', function () {
    var result = (0, _calendar.getNextUnit)('hour');
    expect(result).toBe('day');
  });
  it('day to month', function () {
    var result = (0, _calendar.getNextUnit)('day');
    expect(result).toBe('month');
  });
  it('month to year', function () {
    var result = (0, _calendar.getNextUnit)('month');
    expect(result).toBe('year');
  });
  it('year to empty string', function () {
    var result = (0, _calendar.getNextUnit)('year');
    expect(result).toBe('');
  });
  it('unknown value to empty string', function () {
    var result = (0, _calendar.getNextUnit)('foo');
    expect(result).toBe('');
  });
}); /* eslint-disable */