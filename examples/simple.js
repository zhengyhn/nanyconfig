var NAnyConfig = require('../index.js');

var anyConfig = new NAnyConfig({url: 'http://localhost:8080', token: '123'});

anyConfig.get('crawler.updateInterval', function (err, value) {
  if (err) {
    return console.error(err);
  }
  console.info('callback: ' + value);
});

anyConfig.get('crawler.updateInterval').then(function (value) {
  console.info('promise: ' + value);
}).catch(function (err) {
  console.error(err);
});
