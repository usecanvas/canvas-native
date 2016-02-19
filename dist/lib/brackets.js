'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.stripPrefix = stripPrefix;
exports.wrap = wrap;
var BRACKETS = ['⧙', '⧘'];
var PREFIX_REGEX = new RegExp('^' + BRACKETS[0] + '.*?' + BRACKETS[1]);

var brackets = BRACKETS;

exports.brackets = brackets;

function stripPrefix(text) {
  return text.replace(PREFIX_REGEX, '');
}

function wrap(text) {
  return '' + BRACKETS[0] + text + BRACKETS[1];
}