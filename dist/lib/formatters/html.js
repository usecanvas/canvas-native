'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = format;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _markdown = require('./markdown');

var _markdown2 = _interopRequireDefault(_markdown);

function format(native) {
  return (0, _marked2['default'])((0, _markdown2['default'])(native));
}

module.exports = exports['default'];