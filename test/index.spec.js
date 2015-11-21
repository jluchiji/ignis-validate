/**
 * test/index.spec.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */
'use strict';

const Chai         = require('chai');
Chai.use(require('sinon-chai'));
Chai.use(require('chai-as-promised'));

/*!
 * Setup global stuff here.
 */
global.co          = require('bluebird').coroutine;
global.expect      = Chai.expect;
global.Sinon       = require('sinon');

/*!
 * Start tests.
 */
const Ignis = require('ignis');
const JsonSchema = require('express-jsonschema');
const ValidationService = require('../lib');

before(function() { JsonSchema._validate = JsonSchema.validate; });
after(function() { JsonSchema.validate = JsonSchema._validate; });

beforeEach(co(function*() {
  this.cb = Sinon.spy(JsonSchema._validate);
  JsonSchema.validate = this.cb;

  Ignis.reset();
  this.ignis = Ignis();
  this.ignis.use(Ignis.Http);
  this.ignis.use(ValidationService);

  yield this.ignis.init();

  this.validate = this.ignis.service('validation');
}));

describe('init()', function() {

  it('should push a pre-handler factory', co(function*() {
    yield this.ignis.init();

    const pre = this.ignis.service('http')[Ignis.Http.$$pre];
    expect(pre)
      .to.have.length(1);
    expect(pre[0])
      .to.equal(this.validate.factory);
  }));

});

describe('factory(ignis, meta)', function() {

  it('should create a new middleware function', function() {
    const arg0 = { };
    const arg1 = { body: { foo: 'bar' } };

    const mw = this.validate.factory(arg0, { schema: arg1 });

    expect(mw)
      .to.be.a('function');
    expect(this.cb)
      .to.be.calledOnce
      .to.be.calledWith(arg1);
  });

  it('should not create a middleware if there is no schema', function() {
    let mw = this.validate.factory({ }, { });
    expect(mw)
      .to.be.null;

    mw = this.validate.factory({ }, { schema: null });
    expect(mw)
      .to.be.null;
  });

  it('should default to applying schema to body', function() {
    const arg0 = { };
    const arg1 = { foo: 'bar' };

    const mw = this.validate.factory(arg0, { schema: arg1 });

    expect(mw)
      .to.be.a('function');
    expect(this.cb)
      .to.be.calledOnce
      .to.be.calledWith({ body: arg1 });
  });

});
