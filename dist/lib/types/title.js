'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _type = require('./type');

var _type2 = _interopRequireDefault(_type);

var _brackets = require('../brackets');

var Title = (function (_Type) {
  _inherits(Title, _Type);

  function Title() {
    _classCallCheck(this, Title);

    _get(Object.getPrototypeOf(Title.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Title, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        type: this.type,
        content: this.content
      };
    }
  }, {
    key: 'toMarkdown',
    value: function toMarkdown(prev, next) {
      var result = '# ' + this.match[2];

      if (!next) {
        return result;
      }

      return result + '\n';
    }
  }, {
    key: 'content',
    get: function get() {
      return this.match[2];
    }
  }, {
    key: 'isSummarized',
    get: function get() {
      return false;
    }
  }], [{
    key: 'buildPrefix',
    value: function buildPrefix() {
      return (0, _brackets.wrap)('doc-heading');
    }
  }, {
    key: 'matchMarkdown',
    value: function matchMarkdown(markdown) {
      var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var hasTitle = _ref.hasTitle;

      if (hasTitle) {
        return null;
      }

      var mdMatch = markdown.match(this.markdownPattern);

      if (!mdMatch) {
        return null;
      }

      var nativeString = this.buildPrefix(markdown) + markdown.replace(/^# /, '');
      return this.match(nativeString);
    }
  }, {
    key: 'markdownPattern',
    get: function get() {
      return (/^# (.*)$/
      );
    }
  }, {
    key: 'name',
    get: function get() {
      return 'title';
    }
  }, {
    key: 'nativePattern',
    get: function get() {
      return new RegExp('^(' + (0, _brackets.wrap)('doc-heading') + ')(.*)$');
    }
  }]);

  return Title;
})(_type2['default']);

exports['default'] = Title;
module.exports = exports['default'];