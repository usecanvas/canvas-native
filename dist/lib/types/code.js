'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _brackets = require('../brackets');

var Code = (function (_Type) {
  _inherits(Code, _Type);

  function Code() {
    _classCallCheck(this, Code);

    _get(Object.getPrototypeOf(Code.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Code, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        type: this.type,
        content: this.content,
        meta: {
          language: this.language
        }
      };
    }
  }, {
    key: 'toMarkdown',
    value: function toMarkdown(prev, next) {
      var result = this.content;

      if (!prev || prev.type !== this.type) {
        result = '```\n' + result;
      }

      if (!next) {
        result = result + '\n```';
      }

      if (next && next.type !== this.type) {
        result = result + '\n```\n';
      }

      return result;
    }
  }, {
    key: 'content',
    get: function get() {
      return this.match[3];
    }
  }, {
    key: 'groupType',
    get: function get() {
      return 'code-block';
    }
  }, {
    key: 'language',
    get: function get() {
      return this.match[2] || null;
    }
  }], [{
    key: 'buildPrefix',
    value: function buildPrefix(markdown) {
      var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var groupLang = _ref.groupLang;

      if (groupLang) {
        return (0, _brackets.wrap)('code-' + groupLang);
      } else {
        return (0, _brackets.wrap)('code');
      }
    }
  }, {
    key: 'matchMarkdown',
    value: function matchMarkdown(markdown) {
      var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var groupType = _ref2.groupType;
      var groupLang = _ref2.groupLang;

      if (groupType !== 'code') {
        return null;
      }

      return _get(Object.getPrototypeOf(Code), 'matchMarkdown', this).apply(this, arguments);
    }
  }, {
    key: 'markdownPattern',
    get: function get() {
      return (/^(.*)$/
      );
    }
  }, {
    key: 'name',
    get: function get() {
      return 'code';
    }
  }, {
    key: 'nativePattern',
    get: function get() {
      var prefix = (0, _brackets.wrap)('code(?:-([^' + _brackets.brackets[1] + ']*))?');
      return new RegExp('^(' + prefix + ')(.*)$');
    }
  }]);

  return Code;
})(_type2['default']);

exports['default'] = Code;
module.exports = exports['default'];