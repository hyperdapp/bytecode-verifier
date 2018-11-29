const solc = require('solc');
const Web4 = require('web4');
const fs = require('fs');

var solc_version = 'v0.4.4+commit.4633f3de';
var file_name = 'MultiSigWallet.sol';
var v3 = '0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9';
var is_optimized = 1;
var provider = 'https://mainnet.infura.io';
var file_folder = process.cwd();

var web4 = new Web4( new Web4.providers.HttpProvider(provider));

var file_path = file_folder +'/'+file_name;
var input = fs.readFileSync(file_path,'utf8');
solc.loadRemoteVersion(solc_version, function(err, solc_specific){
  if(err){
    console.log('Solc failed to loaded'+err);
  }
  var output = solc_specific.compile(input, is_optimized);


  if (typeof output['contracts'][':'+file_name.slice(0,file_name.length-4)] === 'undefined'){
    // if there are more than one contract in the contract file, then the JSON representation will have ":"
    // at the front, but if there is only the main contract, there won't, in which case the vaule assignment
    // above will be empty or undefined.
    var bytecode = output['contracts'][file_name.slice(0,file_name.length-4)]['runtimeBytecode'];
  }
  else{
    var bytecode = output['contracts'][':'+file_name.slice(0,file_name.length-4)]['runtimeBytecode'];
  }

  console.log(">>", bytecode)
});
