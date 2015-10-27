'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.convert = convert;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _markdown = require('./markdown');

function convert(native) {
  return (0, _marked2['default'])((0, _markdown.convert)(native));
}