'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = parse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _parseOrder = require('./parse-order');

var _parseOrder2 = _interopRequireDefault(_parseOrder);

function parse(markdown) {
  var sources = markdown.split('\n');
  var result = [];

  var context = { groupType: null, hasTitle: false };

  var didNewLine = false;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var source = _step.value;

      var line = undefined;

      if (source === '' && context.groupType !== 'code' && didNewLine) {
        didNewLine = false;
        continue;
      } else {
        didNewLine = true;
      }

      if (/^```.*/.test(source)) {
        if (context.groupType === 'code') {
          context.groupType = null;
        } else {
          context.groupType = 'code';
        }

        continue;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _parseOrder2['default'][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var klass = _step2.value;

          if (!klass.matchMarkdown) {
            continue;
          }

          if (line = klass.matchMarkdown(source, context)) {
            break;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (!line) {
        throw new Error('No matching type for source "' + source + '"');
      }

      result.push(line);

      context.hasTitle = true; // Only the first line is eligible
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

module.exports = exports['default'];