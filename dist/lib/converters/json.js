'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.convert = convert;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _scanner = require('../scanner');

var _scanner2 = _interopRequireDefault(_scanner);

function convert(native) {
  var json = createGroup('canvas');
  var scanner = new _scanner2['default'](native);

  var currentNode = json;

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = scanner[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var current = _step$value[1];

      var groupType = current.groupType;

      if (!nodeContainsLine(currentNode, current)) {
        if (groupType === 'canvas') {
          currentNode = json;
        } else {
          var newGroup = createGroup(groupType);
          json.content.push(newGroup);
          currentNode = newGroup;
        }
      }

      currentNode.content.push(current.toJSON());
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

  return json;
}

function createGroup(type) {
  return {
    content: [],
    type: type
  };
}

function nodeContainsLine(node, line) {
  return node.type === line.groupType;
}