var request = require('request');
var _ = require('lodash');
var util = require('./util.js');

/**
 * constructor
 *
 * @param {Object} options {
 *    url: 'the url of anyconfig',
 *    rabbitmqUrl: 'the url of rabbitmq, for rpc call',
 *    token: 'the token of anyconfig',
 *    timeout: 'http request timeout'
 *  }
 */
function NAnyConfig(options) {
  options = _.isObject(options) ? options : {};

  this.token = options.token;
  this.url = options.url;
  this.rabbitmqUrl = options.rabbitmqUrl;
  this.rpcQueue = options.rpcQueue;
  this.timeout = options.timeout || 5000;

  if (this.rabbitmqUrl) {
    this.rpc = require('amqp-rpc').factory({
      url: this.rabbitmqUrl
    });
  }
}

/**
 * get anyconfig by key
 *
 * @param {String} key    the config's key
 * @param {function} cb   if pass, will callback, if not, return a promise
 */
NAnyConfig.prototype.get = function (key, cb) {
  var self = this;

  // Promise calling
  if (!cb) {
    return new Promise(function (resolve, reject) {
      self.get(key, function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }

  if (!key) {
    return cb('key is null');
  }
  const param = {
    method: 'GET',
    url: this.url + '/api/get' + '?key=' + key,
    headers: {token: this.token},
    timeout: this.timeout
  }

  util.request(param, cb)
}

/**
 * get anyconfig by key (rpc)
 *
 * @param {String} key    the config's key
 * @param {function} cb   if pass, will callback, if not, return a promise
 */
NAnyConfig.prototype.rpcGet = function (key, cb) {
  var self = this;

  // Promise calling
  if (!cb) {
    return new Promise(function (resolve, reject) {
      self.rpcGet(key, function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }

  if (!key) {
    return cb('key is null');
  }
  if (!this.rpc) {
    return cb('please init rpc');
  }
  console.log(this.rpcQueue);
  this.rpc.call(this.rpcQueue, {key: key}, function (ret) {
    if (ret && ret.code === 0) {
      return cb(null, ret.data);
    } else {
      return cb(ret && ret.msg || 'rpc error');
    }
  });
}

/**
 * get anyconfig by multiple key
 *
 * @param {String} key    the config's key
 * @param {function} cb   if pass, will callback, if not, return a promise
 */
NAnyConfig.prototype.getMultiple = function (keys, cb) {
  var self = this;

  // Promise calling
  if (!cb) {
    return new Promise(function (resolve, reject) {
      self.getMultiple(keys, function (err, result) {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }

  if (_.isEmpty(keys)) {
    return cb('key is null');
  }
  const param = {
    method: 'GET',
    url: this.url + '/api/getMultiple' + '?key=' + keys.join(','),
    headers: {token: this.token},
    timeout: this.timeout
  };
  util.request(param, cb); 
}

module.exports = NAnyConfig;
