'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _brackets = require('../brackets');

var List = (function (_Type) {
  _inherits(List, _Type);

  function List() {
    _classCallCheck(this, List);

    _get(Object.getPrototypeOf(List.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(List, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        type: this.type,
        content: this.content,
        meta: { level: this.level }
      };
    }
  }, {
    key: 'toMarkdown',
    value: function toMarkdown(prev, next) {
      var result = this.match[3];

      var level = this.level;
      for (var i = 0; i < level; i++) {
        result = '  ' + result;
      }

      if (next && next.type !== this.type) {
        return result + '\n';
      }

      return result;
    }
  }, {
    key: 'groupType',
    get: function get() {
      return this.type.replace(/-item$/, '');
    }
  }, {
    key: 'level',
    get: function get() {
      return parseInt(this.match[2], 10);
    }
  }], [{
    key: 'buildPrefix',
    value: function buildPrefix(markdown) {
      var whitespaceLength = markdown.match(/^( *)/)[1].length;
      var level = Math.ceil(whitespaceLength / 2);
      return (0, _brackets.wrap)(this.prefixBase + '-' + level.toString());
    }
  }, {
    key: 'matchMarkdown',
    value: function matchMarkdown(markdown) {
      var mdMatch = markdown.match(this.markdownPattern);

      if (!mdMatch) {
        return null;
      }

      var nativeString = this.buildPrefix(markdown) + markdown.replace(/^ */, '');
      return this.match(nativeString);
    }
  }]);

  return List;
})(_type2['default']);

exports['default'] = List;
module.exports = exports['default'];