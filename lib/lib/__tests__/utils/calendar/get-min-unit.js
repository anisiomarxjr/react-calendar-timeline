'use strict';

var _calendar = require('../../../utility/calendar');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */
var defaultTimeSteps = {
  second: 1,
  minute: 1,
  hour: 1,
  day: 1,
  month: 1,
  year: 1
};

describe('getMinUnit', function () {
  // this is the happy path and used as safety net if we make any refactorings
  // to this function.  There seem to be a ton of edge cases here...
  describe('standard width of 1200', function () {
    var standardWidth = 1200;
    it('should be second for one minute duration', function () {
      var oneMinute = _moment2.default.duration(1, 'minute').asMilliseconds();
      var result = (0, _calendar.getMinUnit)(oneMinute, standardWidth, defaultTimeSteps);

      expect(result).toBe('second');
    });
    it('should be minute for one hour duration', function () {
      var oneHour = _moment2.default.duration(1, 'hour').asMilliseconds();
      var result = (0, _calendar.getMinUnit)(oneHour, standardWidth, defaultTimeSteps);

      expect(result).toBe('minute');
    });
    it('should be hour for one day duration', function () {
      var oneDay = _moment2.default.duration(1, 'day').asMilliseconds();
      var result = (0, _calendar.getMinUnit)(oneDay, standardWidth, defaultTimeSteps);

      expect(result).toBe('hour');
    });
    it('should be day for one week duration', function () {
      var oneWeek = _moment2.default.duration(1, 'week').asMilliseconds();
      var result = (0, _calendar.getMinUnit)(oneWeek, standardWidth, defaultTimeSteps);

      expect(result).toBe('day');
    });
    it('should be day for one month duration', function () {
      var oneMonth = _moment2.default.duration(1, 'month').asMilliseconds();
      var result = (0, _calendar.getMinUnit)(oneMonth, standardWidth, defaultTimeSteps);

      expect(result).toBe('day');
    });
    it('should be month for one year duration', function () {
      var oneYear = _moment2.default.duration(1, 'year').asMilliseconds();
      var result = (0, _calendar.getMinUnit)(oneYear, standardWidth, defaultTimeSteps);

      expect(result).toBe('month');
    });
  });
});