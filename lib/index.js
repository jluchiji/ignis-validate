/**
 * index.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

'use strict';

var _bluebird = require('bluebird');

Object.defineProperty(exports, '__esModule', {
  value: true
});
// istanbul ignore next

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// istanbul ignore next

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// istanbul ignore next

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// istanbul ignore next

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ignis = require('ignis');

var _ignis2 = _interopRequireDefault(_ignis);

var _expressJsonschema = require('express-jsonschema');

var _expressJsonschema2 = _interopRequireDefault(_expressJsonschema);

let ValidationService = (function (_Ignis$Service) {
  _inherits(ValidationService, _Ignis$Service);

  function ValidationService() {
    _classCallCheck(this, _ValidationService);

    _get(Object.getPrototypeOf(_ValidationService.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ValidationService, [{
    key: 'init',
    value: _bluebird.coroutine(function* (http) {
      http.pre(this.factory);
    })

    /**
     * Validation middleware factory
     */
  }, {
    key: 'factory',
    value: function factory(ignis, meta) {
      let schema = meta.schema;
      if (!schema) {
        return null;
      }

      /* Default to validating body */
      const check = _lodash2['default'].partial(_lodash2['default'].has, schema);
      if (!check('body') && !check('query') && !check('params')) {
        schema = { body: schema };
      }

      return _expressJsonschema2['default'].validate(schema);
    }
  }]);

  var _ValidationService = ValidationService;
  ValidationService = _ignis2['default'].Service.deps('http')(ValidationService) || ValidationService;
  return ValidationService;
})(_ignis2['default'].Service);

exports['default'] = ValidationService;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
