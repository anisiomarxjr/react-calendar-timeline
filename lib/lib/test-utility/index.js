'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildDom = buildDom;

var _jsdom = require('jsdom');

function buildDom(domString) {
  return new _jsdom.JSDOM('<!DOCTYPE html><body>' + domString + '></body>');
}