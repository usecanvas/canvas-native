'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Type = (function () {
  function Type(match) {
    _classCallCheck(this, Type);

    this.match = match;
  }

  _createClass(Type, [{
    key: 'toJSON',
    value: function toJSON() {
      throw new Error('Must implement `toJSON` for each type');
    }
  }, {
    key: 'toMarkdown',
    value: function toMarkdown() /* prev, next */{
      throw new Error('Must implement `toMarkdown` for each type');
    }
  }, {
    key: 'groupType',
    get: function get() {
      return 'canvas';
    }
  }, {
    key: 'type',
    get: function get() {
      return this.constructor.name;
    }
  }], [{
    key: 'match',
    value: function match(text) {
      var match = text.match(this.pattern);

      if (match) {
        return new this(match);
      }

      return null;
    }
  }, {
    key: 'name',
    get: function get() {
      throw new Error('Must implement `name` for each type');
    }
  }, {
    key: 'pattern',
    get: function get() {
      throw new Error('Must implement `pattern` for each type');
    }
  }]);

  return Type;
})();

exports['default'] = Type;
module.exports = exports['default'];