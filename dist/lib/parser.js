'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.parse = parse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _typesChecklist = require('./types/checklist');

var _typesChecklist2 = _interopRequireDefault(_typesChecklist);

var _typesCode = require('./types/code');

var _typesCode2 = _interopRequireDefault(_typesCode);

var _typesHeading = require('./types/heading');

var _typesHeading2 = _interopRequireDefault(_typesHeading);

var _typesHorizontalRule = require('./types/horizontal-rule');

var _typesHorizontalRule2 = _interopRequireDefault(_typesHorizontalRule);

var _typesImage = require('./types/image');

var _typesImage2 = _interopRequireDefault(_typesImage);

var _typesLinkDefinition = require('./types/link-definition');

var _typesLinkDefinition2 = _interopRequireDefault(_typesLinkDefinition);

var _typesOrderedList = require('./types/ordered-list');

var _typesOrderedList2 = _interopRequireDefault(_typesOrderedList);

var _typesParagraph = require('./types/paragraph');

var _typesParagraph2 = _interopRequireDefault(_typesParagraph);

var _typesTitle = require('./types/title');

var _typesTitle2 = _interopRequireDefault(_typesTitle);

var _typesUnorderedList = require('./types/unordered-list');

var _typesUnorderedList2 = _interopRequireDefault(_typesUnorderedList);

var PARSE_ORDER = [_typesChecklist2['default'], _typesCode2['default'], _typesTitle2['default'], _typesHeading2['default'], _typesHorizontalRule2['default'], _typesImage2['default'], _typesLinkDefinition2['default'], _typesOrderedList2['default'], _typesUnorderedList2['default'], _typesParagraph2['default']];

function parse(text) {
  var sources = text.split('\n');
  var result = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var source = _step.value;

      var line = undefined;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = PARSE_ORDER[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var klass = _step2.value;

          if (line = klass.match(source)) {
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