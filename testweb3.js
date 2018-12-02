
// content of index.js
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
var express = require('express')
var bodyParser = require('body-parser')
var AWS = require('aws-sdk');
var cors = require('cors')
const docClient = new AWS.DynamoDB.DocumentClient();

const net_to_provider = {
        '1':'https://chain.hyperdapp.org',
        '2': 'https://ashoka.hyperdapp.org',
        '3': 'https://shivaji.hyperdapp.org',
        '4': 'https://chola.hyperdapp.org',
        '5': 'https://mainnet.infura.io',
      }
var solc_version = 'v0.4.4+commit.4633f3de';

  var chain = 5;
  const web3 = new Web3( new Web3.providers.HttpProvider( net_to_provider[chain] ));

   web3.eth.getCode("0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9")


   .then(output =>{
     console.log("output;", output)
     if (parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[0].slice(1)) >= 4
      && parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[1].slice(1)) >= 7){
       // code stored at the contract address has no constructor or contract creation bytecode,
       // only with swarm metadata appending at the back, therefore to get the actual deployed bytecode,
       // just slice out the trailing swarm metadata.
       var ending_point = output.search('a165627a7a72305820');

       var swarm_hash_full = output.slice(output.lastIndexOf("a165627a7a72305820"), -4);
       var swarm_hash = swarm_hash_full.slice(18);

       bytecode_from_blockchain = output.slice(0,ending_point);

     }
     // if the solc version is less than 0.4.7, then just directly compared the two.
     else{
       bytecode_from_blockchain = output;

     }
     return bytecode_from_blockchain;
   })
   .catch(function (err) {
      console.log({message: 'Failed to check for transaction receipt:', data: err});
    });
