# nanyconfig
The node wrapper for the [anyconfig](https://github.com/zhengyhn/anyconfig) project

[![Build Status](https://travis-ci.org/zhengyhn/nanyconfig.svg?branch=master)](https://travis-ci.org/zhengyhn/nanyconfig)

## Requirement
You must know what is the [anyconfig](https://github.com/zhengyhn/anyconfig) project.

## Usage
```
const NAnyConfig = require('nanyconfig');

const options = {
  token: '013918fe4ab81be96cc52a37ce6dd8db',   // the token of the anyconfig project
  url: 'http://localhost:8080',                // the url of the anyconfig project
  timeout: 2000                                // http request timeout, default is 5000ms
};

const anyConfig = new NAnyConfig(options);

anyConfig.get('key', function (err, value) {
  console.info(value);
});

anyConfig.get('key')
  .then(function (value) {
    console.info(value);
  }).catch(err) {
    console.error(err);
  });
```
