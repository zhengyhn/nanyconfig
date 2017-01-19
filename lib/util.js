var request = require('request');

/**
 * common request 
 *
 */
exports.request = function (param, cb) {
  var options = {
    method: param.method,
    url: param.url,
    headers: param.headers,
    timeout: param.timeout
  };
  request(options, function (err, res, result) {
    if (err || res.statusCode !== 200 || !result) {
      return cb(err || 'request error');
    }
    var json = {};
    try {
      json = JSON.parse(result);
    } catch (e) {
      return cb(e);
    }
    if (json.code !== 0) {
      return cb(json.msg);
    }
    return cb(null, json.data);
  });
}
