/**
 * index.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.factory = factory;
exports['default'] = extension;
// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _expressJsonschema = require('express-jsonschema');

var _expressJsonschema2 = _interopRequireDefault(_expressJsonschema);

/**
 * factory(2)
 *
 * @param          {ignis}     Ignis instance.
 * @param          {meta}      Configuration metadata.
 * @returns        {Function}  Ignis.js middleware factory.
 */

function factory(ignis, meta) {
  var schema = meta.schema || meta.validation || meta.validate;
  if (!schema) {
    return null;
  }

  var check = _lodash2['default'].curry(_lodash2['default'].has)(schema);
  if (!check('body') && !check('query') && !check('params')) {
    schema = { body: schema };
  }

  return _expressJsonschema2['default'].validate(schema);
}

/**
 * extension(1)
 *
 * @param          {ignis}     Ignis instance.
 */

function extension(Ignis) {
  Ignis.init(function () {
    this.factories.push(factory);
  });
}
//# sourceMappingURL=index.js.map