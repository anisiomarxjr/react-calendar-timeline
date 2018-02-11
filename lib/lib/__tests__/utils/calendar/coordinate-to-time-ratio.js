'use strict';

var _calendar = require('../../../utility/calendar');

describe('coordinateToTimeRatio', function () {
  it('calculates ratio', function () {
    var width = 1000; // in pixels;

    var canvasTimeEnd = 20000;
    var canvasTimeStart = 10000;

    var expected = 10; // 10 units for every pixel;
    expect((0, _calendar.coordinateToTimeRatio)(canvasTimeStart, canvasTimeEnd, width)).toBe(expected);
  });
});