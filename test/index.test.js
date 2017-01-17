var should = require('should');

var NAnyConfig = require('../lib/index.js');

describe('Test the node wrapper of anyConfig', function () {
  describe('Test the constructor', function () {
    it('Pass empty options should construct empty object', function (done) {
      var anyConfig = new NAnyConfig();

      anyConfig.should.exists;
      anyConfig.should.an.Object;
      anyConfig.should.have.property('get');

      done();
    });

    it('Pass string options should construct empty object', function (done) {
      var anyConfig = new NAnyConfig('test');

      anyConfig.should.exists;
      anyConfig.should.an.Object;
      anyConfig.should.have.property('get');
      anyConfig.should.have.property('token');
      anyConfig.should.have.property('url');

      done();
    });

    it('Pass options should construct normally', function (done) {
      var token = '123';
      var url = 'test';
      var anyConfig = new NAnyConfig({token: token, url: url});

      anyConfig.should.exists;
      anyConfig.should.an.Object;
      anyConfig.should.have.property('get');
      anyConfig.should.have.property('token', token);
      anyConfig.should.have.property('url', url);

      done();
    });

  });

  describe('Test the get method, promise', function () {
    this.timeout(10000);
    var anyConfig = new NAnyConfig();

    it('Pass nothing should return error', function (done) {
      anyConfig.get().catch(function (err) {
        err.should.exists;

        done();
      });
    });

    it('Wrong url should return http timeout error', function (done) {
      anyConfig.get('key').catch(function (err) {
        err.should.exists;
        err.should.have.property('code', 'ECONNREFUSED');

        done();
      });
    });

    it('No cb param should return promise', function (done) {
      var p = anyConfig.get('key');
      p.should.be.Promise;

      done();
    });
  });

  describe('Test the get method, callback', function () {
    var anyConfig = new NAnyConfig();

    it('Pass empty key should callback error', function (done) {
      anyConfig.get('', function (err, result) {
        err.should.exists;
        should.not.exists(result);

        done();
      });
    });

    it('Wrong url should return http error', function (done) {
      anyConfig.get('key', function (err) {
        err.should.exists;
        err.should.have.property('code', 'ECONNREFUSED');

        done();
      });
    });
  });

  describe('Test the getMultiple method, promise', function () {
    this.timeout(10000);
    var anyConfig = new NAnyConfig();

    it('Pass nothing should return error', function (done) {
      anyConfig.getMultiple().catch(function (err) {
        err.should.exists;

        done();
      });
    });

    it('Wrong url should return http timeout error', function (done) {
      anyConfig.getMultiple(['key']).catch(function (err) {
        err.should.exists;
        err.should.have.property('code', 'ECONNREFUSED');

        done();
      });
    });

    it('No cb param should return promise', function (done) {
      var p = anyConfig.getMultiple(['key']);
      p.should.be.Promise;

      done();
    });
  });

  describe('Test the getMultiple method, callback', function () {
    var anyConfig = new NAnyConfig();

    it('Pass empty key should callback error', function (done) {
      anyConfig.getMultiple([''], function (err, result) {
        err.should.exists;
        should.not.exists(result);

        done();
      });
    });

    it('Wrong url should return http error', function (done) {
      anyConfig.getMultiple(['key'], function (err) {
        err.should.exists;
        err.should.have.property('code', 'ECONNREFUSED');

        done();
      });
    });
  });
});
