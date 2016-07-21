# nanyconfig
The node wrapper for the [anyconfig](https://github.com/zhengyhn/anyconfig) project

[![Build Status](https://travis-ci.org/zhengyhn/nanyconfig.svg?branch=master)](https://travis-ci.org/zhengyhn/nanyconfig)

## Requirement
You must know what is the [anyconfig](https://github.com/zhengyhn/anyconfig) project.

## Usage
```
const NAnyConfig = require('nanyconfig');

const options = {
  token: '013918fe4ab81be96cc52a37ce6dd8db',
  url: 'http://localhost:8080'
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
