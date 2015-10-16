/**
 * test/index.spec.js
 *
 * @author  Denis Luchkin-Zhou <denis@ricepo.com>
 * @license MIT
 */
/* jshint -W030 */

var Sinon          = require('sinon');
var Chai           = require('chai');
var JsonSchema     = require('express-jsonschema');
var expect         = Chai.expect;

var Ignis          = require('ignis');

Chai.use(require('sinon-chai'));

var target         = require('../lib');

describe('factory(2)', function() {

  before(function() { JsonSchema._validate = JsonSchema.validate; });
  after(function() { JsonSchema.validate = JsonSchema._validate; });

  beforeEach(function() {
    this.validate = Sinon.spy(JsonSchema._validate);
    JsonSchema.validate = this.validate;
  });

  it('should create a new middleware function', function() {
    var arg0 = Object.create(null);
    var arg1 = { body: { foo: 'bar' } };

    var mware = target.factory(arg0, { validate: arg1 });

    expect(mware).to.be.a('function');
    expect(this.validate)
      .to.be.calledOnce.and
      .to.be.calledWith(arg1);
  });

  it('should not create a middleware if there is no schema', function() {
    var mware = target.factory({ }, { });
    expect(mware).to.be.null;

    mware = target.factory({ }, { validate: null });
    expect(mware).to.be.null;
  });

  it('should default to applying schema to body', function() {
    var arg0 = Object.create(null);
    var arg1 = { foo: 'bar' };

    var mware = target.factory(arg0, { validate: arg1 });

    expect(mware).to.be.a('function');
    expect(this.validate)
      .to.be.calledOnce.and
      .to.be.calledWith({ body: arg1 });
  });

});

describe('extension(1)', function() {

  it('should mount the extension', function() {
    this.ignis = new Ignis()
    this.ignis.use(target);

    expect(this.ignis.factories[0]).to.be.a('function');
  });

});
