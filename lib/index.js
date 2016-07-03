var request = require('request');
var _ = require('lodash');

/**
 * constructor
 *
 * @param {Object} option {
 *    url: 'the url of anyconfig',
 *    token: 'the token of anyconfig'
 *  }
 */
function NAnyConfig(option) {
  option = _.isObject(option) ? option : {};

  this.token = option.token || '';
  this.url = option.url || 'http://localhost:8080';
}

/**
 * get anyconfig by key
 *
 * @param {String} key    the config's key
 * @param {function} cb   if pass, will callback, if not, return a promise
 */
NAnyConfig.prototype.get = function (key, cb) {
  var _this = this;
  if (!cb) {
    return new Promise(function (resolve, reject) {
      _this.get(key, function (err, result) {
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
    url: this.url + '/api/get',
    headers: {
      token: this.token
    },
    json: {
      key: key
    }
  };
  request.post(options, function (err, res, result) {
    if (err || res.statusCode !== 200) {
      return cb(err || 'request error');
    }
    try {
      if (result.code !== 0) {
        return cb(result.msg);
      }
      return cb(null, result.data);
    } catch (error) {
      return cb(error);
    }
  });
}

module.exports = NAnyConfig;
