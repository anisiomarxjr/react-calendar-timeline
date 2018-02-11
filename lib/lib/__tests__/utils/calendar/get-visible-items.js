'use strict';

var _calendar = require('../../../utility/calendar');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var itemTimeStartKey = 'start';
var itemTimeEndKey = 'end';

var keys = {
  itemTimeStartKey: itemTimeStartKey,
  itemTimeEndKey: itemTimeEndKey
};

describe('getVisibleItems', function () {
  it('returns items within date range - both dates', function () {
    var _ref;

    var startRange = (0, _moment2.default)().add(-1, 'day').valueOf();
    var endRange = (0, _moment2.default)(startRange).add(1, 'day');
    var items = [(_ref = {}, _defineProperty(_ref, itemTimeStartKey, (0, _moment2.default)(startRange).add(10, 'minute').valueOf()), _defineProperty(_ref, itemTimeEndKey, (0, _moment2.default)(startRange).add(20, 'minute').valueOf()), _defineProperty(_ref, 'id', 1), _ref)];

    var result = (0, _calendar.getVisibleItems)(items, startRange, endRange, keys);

    expect(result).toMatchObject(items);
  });

  it('returns items within date range - start date', function () {
    var _ref2;

    var startRange = (0, _moment2.default)().add(-1, 'day').valueOf();
    var endRange = (0, _moment2.default)(startRange).add(1, 'day');
    var items = [(_ref2 = {}, _defineProperty(_ref2, itemTimeStartKey, (0, _moment2.default)(endRange).add(-10, 'minute').valueOf()), _defineProperty(_ref2, itemTimeEndKey, (0, _moment2.default)(endRange).add(20, 'minute').valueOf()), _defineProperty(_ref2, 'id', 1), _ref2)];

    var result = (0, _calendar.getVisibleItems)(items, startRange, endRange, keys);

    expect(result).toMatchObject(items);
  });

  it('returns items within date range - end date', function () {
    var _ref3;

    var startRange = (0, _moment2.default)().add(-1, 'day').valueOf();
    var endRange = (0, _moment2.default)(startRange).add(1, 'day');
    var items = [(_ref3 = {}, _defineProperty(_ref3, itemTimeStartKey, (0, _moment2.default)(startRange).add(-10, 'minute').valueOf()), _defineProperty(_ref3, itemTimeEndKey, (0, _moment2.default)(startRange).add(10, 'minute').valueOf()), _defineProperty(_ref3, 'id', 1), _ref3)];

    var result = (0, _calendar.getVisibleItems)(items, startRange, endRange, keys);

    expect(result).toMatchObject(items);
  });

  it('does not return items outside of date range - before start date', function () {
    var _ref4;

    var startRange = (0, _moment2.default)().add(-1, 'day').valueOf();
    var endRange = (0, _moment2.default)(startRange).add(1, 'day');
    var items = [(_ref4 = {}, _defineProperty(_ref4, itemTimeStartKey, (0, _moment2.default)(startRange).add(-2, 'day').valueOf()), _defineProperty(_ref4, itemTimeEndKey, (0, _moment2.default)(startRange).add(-1, 'day').valueOf()), _defineProperty(_ref4, 'id', 1), _ref4)];

    var result = (0, _calendar.getVisibleItems)(items, startRange, endRange, keys);

    expect(result).toMatchObject([]);
  });

  it('does not return items outside of date range - after end date', function () {
    var _ref5;

    var startRange = (0, _moment2.default)().add(-1, 'day').valueOf();
    var endRange = (0, _moment2.default)(startRange).add(1, 'day');
    var items = [(_ref5 = {}, _defineProperty(_ref5, itemTimeStartKey, (0, _moment2.default)(endRange).add(1, 'day').valueOf()), _defineProperty(_ref5, itemTimeEndKey, (0, _moment2.default)(endRange).add(2, 'day').valueOf()), _defineProperty(_ref5, 'id', 1), _ref5)];

    var result = (0, _calendar.getVisibleItems)(items, startRange, endRange, keys);

    expect(result).toMatchObject([]);
  });
});