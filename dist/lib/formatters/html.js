'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = format;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _markdownItCheckbox = require('markdown-it-checkbox');

var _markdownItCheckbox2 = _interopRequireDefault(_markdownItCheckbox);

var _markdown = require('./markdown');

var _markdown2 = _interopRequireDefault(_markdown);

var renderer = new _markdownIt2['default']({
  linkify: true
}).use(_markdownItCheckbox2['default']);

function format(native) {
  return renderer.render((0, _markdown2['default'])(native));
}

module.exports = exports['default'];