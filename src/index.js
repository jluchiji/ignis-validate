/**
 * index.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

import _           from 'lodash';
import JsonSchema  from 'express-jsonschema';


/**
 * factory(2)
 *
 * @param          {ignis}     Ignis instance.
 * @param          {meta}      Configuration metadata.
 * @returns        {Function}  Ignis.js middleware factory.
 */
export function factory(ignis, meta) {
  let schema = meta.schema || meta.validation || meta.validate;
  if (!schema) { return null; }

  let check  = _.curry(_.has)(schema);
  if (!check('body') && !check('query') && !check('params')) {
    schema = { body: schema };
  }

  return JsonSchema.validate(schema);
}


/**
 * extension(1)
 *
 * @param          {ignis}     Ignis instance.
 */
export default function extension(ignis) {
  ignis.pre.push(factory);
}
