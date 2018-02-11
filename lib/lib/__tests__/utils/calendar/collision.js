'use strict';

var _calendar = require('../../../utility/calendar');

var buildObject = function buildObject(x, y, width, height) {
  return {
    collisionLeft: x,
    top: y,
    collisionWidth: width,
    height: height
  };
}; /* eslint-disable */


describe('collision', function () {
  describe('left collision', function () {
    it('overlaps', function () {
      var subject = buildObject(45, 0, 50, 50);
      var collidingObject = buildObject(0, 0, 50, 50);

      var result = (0, _calendar.collision)(subject, collidingObject);

      expect(result).toBe(true);
    });

    it('does not overlap', function () {
      var subject = buildObject(50, 0, 50, 50);
      var collidingObject = buildObject(0, 0, 50, 50);

      var result = (0, _calendar.collision)(subject, collidingObject);

      expect(result).toBe(false);
    });
  });

  describe('right collision', function () {
    it('overlaps', function () {
      var subject = buildObject(0, 0, 50, 50);
      var collidingObject = buildObject(45, 0, 50, 50);

      var result = (0, _calendar.collision)(subject, collidingObject);

      expect(result).toBe(true);
    });

    it('does not overlap', function () {
      var subject = buildObject(0, 0, 50, 50);
      var collidingObject = buildObject(50, 0, 50, 50);

      var result = (0, _calendar.collision)(subject, collidingObject);

      expect(result).toBe(false);
    });
  });

  describe('top collision', function () {
    it('overlaps', function () {
      var subject = buildObject(0, 40, 50, 50);
      var collidingObject = buildObject(0, 30, 50, 50);

      var result = (0, _calendar.collision)(subject, collidingObject);

      expect(result).toBe(true);
    });

    it('does not overlap', function () {
      var subject = buildObject(0, 50, 50, 50);
      var collidingObject = buildObject(0, 0, 50, 50);

      var result = (0, _calendar.collision)(subject, collidingObject);

      expect(result).toBe(false);
    });
  });

  describe('bottom collision', function () {
    it('overlaps', function () {
      var subject = buildObject(0, 30, 50, 50);
      var collidingObject = buildObject(0, 50, 50, 50);

      var result = (0, _calendar.collision)(subject, collidingObject);

      expect(result).toBe(true);
    });

    it('does not overlap', function () {
      var subject = buildObject(0, 0, 50, 50);
      var collidingObject = buildObject(0, 50, 50, 50);

      var result = (0, _calendar.collision)(subject, collidingObject);

      expect(result).toBe(false);
    });
  });
});