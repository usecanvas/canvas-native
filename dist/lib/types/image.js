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

var Image = (function (_Type) {
  _inherits(Image, _Type);

  function Image() {
    _classCallCheck(this, Image);

    _get(Object.getPrototypeOf(Image.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Image, [{
    key: 'toJSON',
    value: function toJSON() {
      var meta = {};
      var thisMeta = this.meta;

      for (var key in thisMeta) {
        if (!thisMeta.hasOwnProperty(key)) {
          continue;
        }

        if (key === 'url') {
          continue;
        }

        meta[key] = thisMeta[key];
      }

      return {
        type: this.type,
        content: this.content,
        meta: meta
      };
    }
  }, {
    key: 'toMarkdown',
    value: function toMarkdown(prev, next) {
      if (!next) {
        return this.content;
      }

      return this.content + '\n';
    }
  }, {
    key: 'content',
    get: function get() {
      return this.meta.url;
    }
  }, {
    key: 'meta',
    get: function get() {
      return JSON.parse(this.match[2]);
    }
  }], [{
    key: 'buildPrefix',
    value: function buildPrefix(url) {
      return (0, _brackets.wrap)('image-' + JSON.stringify({ url: url }));
    }
  }, {
    key: 'matchMarkdown',
    value: function matchMarkdown(markdown) {
      var mdMatch = markdown.match(this.markdownPattern);

      if (!mdMatch) {
        return null;
      }

      markdown = mdMatch[1];

      var nativeString = this.buildPrefix(markdown);
      return this.match(nativeString);
    }
  }, {
    key: 'markdownPattern',
    get: function get() {
      return (/^(?:!\[.*?\]\()?(https?:\/\/.+\/.+\.(?:gif|jpg|jpeg|png)(?:\?[^\s)]+)?).*?\)?$/i
      );
    }
  }, {
    key: 'name',
    get: function get() {
      return 'image';
    }
  }, {
    key: 'nativePattern',
    get: function get() {
      return new RegExp('^(' + (0, _brackets.wrap)('image-(.*)') + ')$');
    }
  }]);

  return Image;
})(_type2['default']);

exports['default'] = Image;
module.exports = exports['default'];