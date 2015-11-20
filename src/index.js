/**
 * index.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */

import _           from 'lodash';
import Ignis       from 'ignis';
import Optional    from 'optional';
import JsonSchema  from 'express-jsonschema';

/* Optionally support Schematik instances */
const Schematik = Optional('schematik');


@Ignis.Service.deps('http')
export default class ValidationService extends Ignis.Service {

  async init(http) {
    http.pre(this.factory);
  }


  postinit() {
    /* Provide a shortcut decorator */
    Ignis.Http.Endpoint.schema = _.partial(Ignis.Http.Endpoint.option, 'schema');
  }

  /**
   * Validation middleware factory
   */
  factory(ignis, meta) {
    let schema = meta.schema;
    if (!schema) { return null; }

    /* Default to validating body */
    const check = _.partial(_.has, schema);
    if (!check('body') && !check('query') && !check('params')) {
      schema = { body: schema };
    }

    return JsonSchema.validate(schema);
  }


  /**
   * @static (decorator) HTTP Endpoint's validation schema.
   */
  @Ignis.Service.export({ static: true })
  static schema(schema) {
    /* Convert Schematik instances into JSON Schema */
    if (Schematik && schema instanceof Schematik) { schema = schema.done(); }
    return Ignis.Http.Endpoint.option('schema', schema);
  }

}
