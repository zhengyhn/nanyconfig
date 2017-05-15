var NAnyConfig = require('../index.js');

var anyConfig = new NAnyConfig({
  rabbitmqUrl: 'amqp://guest:guest@localhost:5672',
  rpcQueue: 'koala.anyconfig.get',
  url: 'http://localhost:8081',
  token: '013918fe4ab81be96cc52a37ce6dd8db',
  timeout: 5000
});

anyConfig.get('app.tabIcons', function (err, value) {
  if (err) {
    return console.error(err);
  }
  console.info('callback: ', value);
});

anyConfig.get('xxx').then(function (value) {
  console.info('promise: ', value);
}).catch(function (err) {
  console.error(err);
});

anyConfig.rpcGet('agenda.notifyList').then(function (value) {
  console.info('rpc: ', value);
}).catch(function (err) {
  console.error(err);
});

anyConfig.rpcGet('agenda.notifyList', function (err, value) {
  console.info('rpc: ', value);
});
