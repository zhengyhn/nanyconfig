var request = require('request');
var _ = require('lodash');

/**
 * constructor
 *
 * @param {Object} options {
 *    url: 'the url of anyconfig',
 *    token: 'the token of anyconfig',
 *    timeout: 'http request timeout'
 *  }
 */
function NAnyConfig(options) {
  options = _.isObject(options) ? options : {};

  this.token = options.token || '';
  this.url = options.url || 'http://localhost:8080';
  this.timeout = options.timeout || 5000;
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

  var options = {
    method: 'GET',
    url: this.url + '/api/get' + '?key=' + key,
    headers: {token: this.token},
    timeout: this.timeout
  };
  request(options, function (err, res, result) {
    if (err || res.statusCode !== 200 || !result) {
      return cb(err || 'request error');
    }
    try {
      var json = JSON.parse(result);
      if (json.code !== 0) {
        return cb(json.msg);
      }
      return cb(null, json.data);
    } catch (e) {
      return cb(e);
    }
  });
}

module.exports = NAnyConfig;
