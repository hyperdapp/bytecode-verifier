#!/usr/bin/env node

var web4 = require('../index.js');
var web4 = new web4();

web4.setProvider(new web4.providers.HttpProvider('http://localhost:8545'));

var coinbase = web4.eth.coinbase;
console.log(coinbase);

var balance = web4.eth.getBalance(coinbase);
console.log(balance.toString(10));
