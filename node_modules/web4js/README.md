# Hyperdapp & Theos JavaScript API

[![Join the chat at https://gitter.im/hyperdapp/web4.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/hyperdapp/web4.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is the Ethereum compatible [JavaScript API](https://github.com/hyperdapp/wiki/wiki/JavaScript-API)
which implements the [Generic JSON RPC](https://github.com/hyperdapp/wiki/wiki/JSON-RPC) spec. It's available on npm as a node module, for Bower and component as embeddable scripts, and as a meteor.js package.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![dependency status][dep-image]][dep-url] [![dev dependency status][dep-dev-image]][dep-dev-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Stories in Ready][waffle-image]][waffle-url]

<!-- [![browser support](https://ci.testling.com/hyperdapp/hyperdapp.js.png)](https://ci.testling.com/hyperdapp/hyperdapp.js) -->

You need to run a local Ethereum node to use this library.

[Documentation](https://github.com/hyperdapp/wiki/wiki/JavaScript-API)

## Table of Contents

- [Installation](#installation)
  - [Node.js](#nodejs)
  - [Yarn](#yarn)
  - [Meteor.js](#meteorjs)
  - [As a Browser module](#as-a-browser-module)
- [Usage](#usage)
  - [Migration from 0.13.0 to 0.14.0](#migration-from-0130-to-0140)
- [Contribute!](#contribute)
  - [Requirements](#requirements)
  - [Building (gulp)](#building-gulp)
  - [Testing (mocha)](#testing-mocha)
  - [Community](#community)
  - [Other implementations](#other-implementations)
- [License](#license)

## Installation

### Node.js

```bash
npm install web4
```

### Yarn

```bash
yarn add web4
```

### Meteor.js

```bash
meteor add hyperdapp:web4
```

### As a Browser module

CDN

```html
<script src="https://cdn.jsdelivr.net/gh/hyperdapp/web4.js@1.0.0-beta.36/dist/web4.min.js" integrity="sha256-nWBTbvxhJgjslRyuAKJHK+XcZPlCnmIAAMixz6EefVk=" crossorigin="anonymous"></script>
```

Bower

```bash
bower install web4
```

Component

```bash
component install hyperdapp/web4.js
```

* Include `web4.min.js` in your html file. (not required for the meteor package)

## Usage

Use the `web4` object directly from the global namespace:

```js
console.log(web4); // {eth: .., shh: ...} // It's here!
```

Set a provider (`HttpProvider`):

```js
if (typeof web4 !== 'undefined') {
  web4 = new web4(web4.currentProvider);
} else {
  // Set the provider you want from web4.providers
  web4 = new web4(new web4.providers.HttpProvider("http://localhost:8545"));
}
```

Set a provider (`HttpProvider` using [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication)):

```js
web4.setProvider(new web4.providers.HttpProvider('http://' + BasicAuthUsername + ':' + BasicAuthPassword + '@localhost:8545'));
```

There you go, now you can use it:

```js
var coinbase = web4.eth.coinbase;
var balance = web4.eth.getBalance(coinbase);
```

You can find more examples in the [`example`](https://github.com/hyperdapp/web4.js/tree/master/example) directory.

### Migration from 0.13.0 to 0.14.0

web4.js version 0.14.0 supports [multiple instances of the web4](https://github.com/hyperdapp/web4.js/issues/297) object.
To migrate to this version, please follow the guide:

```diff
-var web4 = require('web4');
+var web4 = require('web4');
+var web4 = new web4();
```
## Contribute!

### Requirements

* Node.js
* npm

```bash
# On Linux:
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install nodejs-legacy
```

### Building (gulp)

```bash
npm run-script build
```


### Testing (mocha)

```bash
npm test
```

### Community
 - [Gitter](https://gitter.im/hyperdapp/web4.js?source=orgpage)
 - [Forum](https://forum.hyperdapp.org/categories/hyperdapp-js)


### Other upcoming implementations
 - Python [web4.py](https://github.com/hyperdapp/web4.py)

## License

[MIT](LICENSE.md) © 2018 Contributors


[LGPL-3.0+](ETH-LICENSE.md) © 2015 Contributors
For any omissions, please contact us at info@hyperdapp.org

[npm-image]: https://badge.fury.io/js/web4.svg
[npm-url]: https://npmjs.org/package/web4
[travis-image]: https://travis-ci.org/hyperdapp/web4.js.svg
[travis-url]: https://travis-ci.org/hyperdapp/web4.js
[dep-image]: https://david-dm.org/hyperdapp/web4.js.svg
[dep-url]: https://david-dm.org/hyperdapp/web4.js
[dep-dev-image]: https://david-dm.org/hyperdapp/web4.js/dev-status.svg
[dep-dev-url]: https://david-dm.org/hyperdapp/web4.js#info=devDependencies
[coveralls-image]: https://coveralls.io/repos/hyperdapp/web4.js/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/hyperdapp/web4.js?branch=master
[waffle-image]: https://badge.waffle.io/hyperdapp/web4.js.svg?label=ready&title=Ready
[waffle-url]: https://waffle.io/hyperdapp/web4.js
