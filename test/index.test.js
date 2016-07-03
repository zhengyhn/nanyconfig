var should = require('should');

var NAnyConfig = require('../lib/index.js');

describe('Test the node wrapper of anyConfig', function () {
  describe('Test the constructor', function () {
    it('pass empty options should construct normally', function (done) {
      var anyConfig = new NAnyConfig();

      should.exists(anyConfig);
      anyConfig.should.an.Object;
      anyConfig.should.have.property('get');

      done();
    });
  });
});
