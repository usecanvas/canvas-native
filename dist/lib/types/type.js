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
    key: 'isNesting',
    get: function get() {
      return typeof this.level === 'number' && this.groupType !== 'canvas';
    }
  }, {
    key: 'isSummarized',
    get: function get() {
      return true;
    }
  }, {
    key: 'source',
    get: function get() {
      return this.match[0];
    }
  }, {
    key: 'type',
    get: function get() {
      return this.constructor.name;
    }
  }], [{
    key: 'buildPrefix',
    value: function buildPrefix() {
      return '';
    }
  }, {
    key: 'match',
    value: function match(native) {
      var match = native.match(this.nativePattern);

      if (match) {
        return new this(match);
      }

      return null;
    }
  }, {
    key: 'matchMarkdown',
    value: function matchMarkdown(markdown) {
      var mdMatch = markdown.match(this.markdownPattern);

      if (!mdMatch) {
        return null;
      }

      var nativeString = this.buildPrefix(markdown) + markdown;
      return this.match(nativeString);
    }
  }, {
    key: 'matchNative',
    value: function matchNative() {
      return this.match.apply(this, arguments);
    }
  }, {
    key: 'name',
    get: function get() {
      throw new Error('Must implement `name` for each type');
    }
  }, {
    key: 'markdownPattern',
    get: function get() {
      throw new Error('Must implement `markdownPattern` for each type');
    }
  }, {
    key: 'nativePattern',
    get: function get() {
      throw new Error('Must implement `nativePattern` for each type');
    }
  }]);

  return Type;
})();

exports['default'] = Type;
module.exports = exports['default'];