'use strict';

var _calendar = require('../../../utility/calendar');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('calculateXPositionForTime', function () {
  var width = 1000;
  var startTime = 100000;
  var endTime = 200000;

  it('returns time in middle of timeline', function () {
    var time = startTime + (endTime - startTime) * 0.5;
    var result = (0, _calendar.calculateXPositionForTime)(startTime, endTime, width, time, 0);

    expect(result).toBe(500);
  });

  it('returns time in the first quarter of timeline', function () {
    var time = startTime + (endTime - startTime) * 0.25;
    var result = (0, _calendar.calculateXPositionForTime)(startTime, endTime, width, time);

    expect(result).toBe(250);
  });

  it('returns time in the middle of timeline with actual date', function () {
    var today = (0, _moment2.default)().startOf('day');
    var startTime = today.valueOf();
    var endTime = today.clone().add(1, 'day').valueOf();
    var time = startTime + (endTime - startTime) * 0.5;
    var result = (0, _calendar.calculateXPositionForTime)(startTime, endTime, width, time);

    expect(result).toBe(500);
  });
});