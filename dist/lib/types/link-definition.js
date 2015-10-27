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

var LinkDefinition = (function (_Type) {
  _inherits(LinkDefinition, _Type);

  function LinkDefinition() {
    _classCallCheck(this, LinkDefinition);

    _get(Object.getPrototypeOf(LinkDefinition.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(LinkDefinition, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        type: this.type,
        content: this.match[0],
        meta: {
          label: this.label,
          url: this.url
        }
      };
    }
  }, {
    key: 'toMarkdown',
    value: function toMarkdown(prev, next) {
      if (!next) {
        return this.match[0];
      }

      return this.match[0] + '\n';
    }
  }, {
    key: 'label',
    get: function get() {
      return this.match[2];
    }
  }, {
    key: 'url',
    get: function get() {
      return this.match[3];
    }
  }], [{
    key: 'name',
    get: function get() {
      return 'link-definition';
    }
  }, {
    key: 'pattern',
    get: function get() {
      return (/^(\[(\S+)\]: (.+))$/
      );
    }
  }]);

  return LinkDefinition;
})(_type2['default']);

exports['default'] = LinkDefinition;
module.exports = exports['default'];