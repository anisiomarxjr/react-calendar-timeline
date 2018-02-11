'use strict';

var _domHelpers = require('../../../utility/dom-helpers');

var _testUtility = require('../../../test-utility');

/* eslint-disable */
var targetId = 'target';
describe('hasSomeParentTheClass', function () {
  describe('is false', function () {
    it('when elements parent and element doesnt have provided class', function () {
      var dom = (0, _testUtility.buildDom)('<div>\n        <div id=' + targetId + '></div>\n      </div>');

      var result = (0, _domHelpers.hasSomeParentTheClass)(dom.window.document.getElementById(targetId), 'foo');

      expect(result).toBe(false);
    });

    // per PR 205
    it('doesnt throw for svg element', function () {
      var dom = (0, _testUtility.buildDom)('<div>\n      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">\n      <circle id=' + targetId + ' cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />\n      </svg>\n      </div>');

      try {
        var result = (0, _domHelpers.hasSomeParentTheClass)(dom.window.document.getElementById(targetId), 'foo');
        expect(result).toBe(false);
      } catch (e) {
        expect(true).toBe(false);
      }
    });
  });

  describe('is true', function () {
    var foundClass = 'my-class';
    it('when element has class', function () {
      var dom = (0, _testUtility.buildDom)('<div>\n        <div id=' + targetId + ' class="' + foundClass + '"></div>\n      </div>');

      var result = (0, _domHelpers.hasSomeParentTheClass)(dom.window.document.getElementById(targetId), foundClass);

      expect(result).toBe(true);
    });
    it('when parent has class', function () {
      var dom = (0, _testUtility.buildDom)('<div>\n      <div class="' + foundClass + '">\n      <div id=' + targetId + '></div>\n\n      </div>\n      </div>');

      var result = (0, _domHelpers.hasSomeParentTheClass)(dom.window.document.getElementById(targetId), foundClass);

      expect(result).toBe(true);
    });
    it('when ancestor has class', function () {
      var dom = (0, _testUtility.buildDom)('<div>\n      <div class="' + foundClass + '">\n      <div></div>\n        <div id=' + targetId + '></div>\n      </div>\n      </div>');

      var result = (0, _domHelpers.hasSomeParentTheClass)(dom.window.document.getElementById(targetId), foundClass);

      expect(result).toBe(true);
    });
  });
});