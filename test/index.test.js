var should = require('should');
var nock = require('nock');
var sinon = require('sinon');

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

    it('Pass options should construct normally', function (done) {
      var token = '123';
      var url = 'test';
      var rabbitmqUrl = 'test';
      var rpcQueue = 'test';
      var anyConfig = new NAnyConfig({
        token: token, url: url,
        rabbitmqUrl: rabbitmqUrl, rpcQueue: rpcQueue
      });

      anyConfig.should.exists;
      anyConfig.should.an.Object;
      anyConfig.should.have.property('get');
      anyConfig.should.have.property('token', token);
      anyConfig.should.have.property('url', url);
      anyConfig.should.have.property('rabbitmqUrl', rabbitmqUrl);
      anyConfig.should.have.property('rpcQueue', rpcQueue);

      done();
    });
  });

  describe('Test the get method, promise', function () {
    this.timeout(10000);

    it('Pass nothing should return error', function (done) {
      var anyConfig = new NAnyConfig();
      anyConfig.get().catch(function (err) {
        err.should.exists;

        done();
      });
    });

    it('No cb param should return promise', function (done) {
      const url = 'http://hank.com';
      var anyConfig = new NAnyConfig({
        url: url,
        token: '123'
      });
      nock(url)
      .get('/api/get?key=key')
      .reply(200, function (uri, body) {
        const ret = {code: 0, data: {a: 1}}
        return ret
      })

      anyConfig.get('key').then(function (ret) {
        ret.a.should.be.equal(1);
        done();
      }).catch(function (err) {
        done(err);
      });
    });
  });

  describe('Test the get method, callback', function () {
    it('Pass empty key should callback error', function (done) {
      var anyConfig = new NAnyConfig();
      anyConfig.get('', function (err, result) {
        err.should.exists;
        should.not.exists(result);

        done();
      });
    });

    it('should callback normally', function (done) {
      const url = 'http://hank.com';
      var anyConfig = new NAnyConfig({
        url: url,
        token: '123'
      });
      nock(url)
      .get('/api/get?key=key')
      .reply(200, function (uri, body) {
        const ret = {code: 0, data: {a: 1}}
        return ret
      })

      anyConfig.get('key', function (err, ret) {
        ret.a.should.be.equal(1);
        done(err);
      });
    });
  });

  describe('Test the getMultiple method, promise', function () {
    this.timeout(10000);

    it('Pass nothing should return error', function (done) {
      var anyConfig = new NAnyConfig();
      anyConfig.getMultiple().catch(function (err) {
        err.should.exists;

        done();
      });
    });

    it('No cb param should return promise', function (done) {
      const url = 'http://hank.com';
      var anyConfig = new NAnyConfig({
        url: url,
        token: '123'
      });
      nock(url)
      .get('/api/getMultiple?key=key,key2')
      .reply(200, function (uri, body) {
        const ret = {code: 0, data: {a: 1, b:2}}
        return ret
      })
      anyConfig.getMultiple(['key', 'key2']).then(function (ret) {
        ret.a.should.be.equal(1);
        ret.b.should.be.equal(2);
        done();
      }).catch(function (err) {
        done(err);
      });
    });
  });

  describe('Test the getMultiple method, callback', function () {
    it('Pass empty key should callback error', function (done) {
      var anyConfig = new NAnyConfig();
      anyConfig.getMultiple([''], function (err, result) {
        err.should.exists;
        should.not.exists(result);

        done();
      });
    });

    it('getMultiple, should callback normally', function (done) {
      const url = 'http://hank.com';
      var anyConfig = new NAnyConfig({
        url: url,
        token: '123'
      });
      nock(url)
      .get('/api/getMultiple?key=key,key2')
      .reply(200, function (uri, body) {
        const ret = {code: 0, data: {a: 1, b:2}}
        return ret
      })
      anyConfig.getMultiple(['key', 'key2'], function (err, ret) {
        ret.a.should.be.equal(1);
        ret.b.should.be.equal(2);
        done(err);
      });
    });
  });

  describe.skip('Test the rpcGet method, promise', function () {
    this.timeout(10000);

    it('Pass nothing should return error', function (done) {
      var anyConfig = new NAnyConfig();
      anyConfig.rpcGet().catch(function (err) {
        err.should.exists;

        done();
      });
    });

    it('should return rpc', function (done) {
      const url = 'http://hank.com';
      var anyConfig = new NAnyConfig({
        rabbitmqUrl: url,
        rpcQueue: '123'
      });
      var call = sinon.stub(anyConfig.rpc, 'call').callsFake(function (queue, cb) {
        return cb(null, {code: 0, data: {a: 1}});
      });
      console.log(call);
      // call.yields();
      // var callback = sinon.spy();

      anyConfig.rpcGet('key').then(function (ret) {
        ret.a.should.be.equal(1);
        done();
      }).catch(function (err) {
        console.error(err);
        done(err);
      });
      call.restore();
    });
  });

  describe('Test the get method, callback', function () {
    it('Pass empty key should callback error', function (done) {
      var anyConfig = new NAnyConfig();
      anyConfig.get('', function (err, result) {
        err.should.exists;
        should.not.exists(result);

        done();
      });
    });

    it('should callback normally', function (done) {
      const url = 'http://hank.com';
      var anyConfig = new NAnyConfig({
        url: url,
        token: '123'
      });
      nock(url)
      .get('/api/get?key=key')
      .reply(200, function (uri, body) {
        const ret = {code: 0, data: {a: 1}}
        return ret
      })

      anyConfig.get('key', function (err, ret) {
        ret.a.should.be.equal(1);
        done(err);
      });
    });
  });
});
