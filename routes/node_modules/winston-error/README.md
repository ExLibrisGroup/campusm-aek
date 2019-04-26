# winston-error
[![Build Status](https://travis-ci.org/lemonde/winston-error.svg?branch=master)](https://travis-ci.org/lemonde/winston-error)
[![Dependency Status](https://david-dm.org/lemonde/winston-error.svg?theme=shields.io)](https://david-dm.org/lemonde/winston-error)
[![devDependency Status](https://david-dm.org/lemonde/winston-error/dev-status.svg?theme=shields.io)](https://david-dm.org/lemonde/winston-error#info=devDependencies)

Error helper for winston.

## Install

```
npm install winston-error
```

## Usage

```js
var winston = require('winston');
var winstonError = require('winston-error');

var logger = new winston.Logger();
winstonError(logger);

logger.error(new Error('My error')); // will add message, stack and code in meta
```

## License

MIT