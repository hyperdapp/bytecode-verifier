
// content of index.js
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
var express = require('express')
var bodyParser = require('body-parser')

var cors = require('cors')



const app = express()
app.use(cors())  //https://github.com/expressjs/cors
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = 5000



app.use(function (req, res) {
  var post_data =( req.body);

  if(Object.keys(post_data).length == 0){
  	res.end(JSON.stringify({status: "No Contract, Send one to get abi."}) )
		console.log(post_data,  req.body.type,"Empty" )
  	return;
  }else{
		console.log("Post Data Exist",post_data,Object.keys(post_data).length)
	}

  try {
    verifyContract(post_data,res);
  } catch (ex) {
    res.end("Error")
  }

  const web3 = new Web3( new Web3.providers.HttpProvider( net_to_provider[post_data.chain] ));

  function verifyContract(event,res) {
    try{

      console.log("Chain: ", net_to_provider[event.chain] );

      var input = event.source;
      var solc_version = event.compilerVersion;
      var is_optimized = event.optimizer;
      var contract_address = event.adr;
      var runs = event.runs;
      var cname = event.name;

      if (true){
        var solc_version = 'v0.4.4+commit.4633f3de';
        var file_name = 'MultiSigWallet.sol';
        var contract_address = '0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9';
        var is_optimized = 1;
        var provider = 'https://mainnet.infura.io';
        var file_folder = process.cwd();
        var file_path = file_folder +'/'+file_name;
        var input = fs.readFileSync(file_path,'utf8');
        var cname = 'MultiSigWallet';
      }


      solc.loadRemoteVersion(solc_version, function(err, solc_specific){
        if(err){
          console.log('Solc failed to loaded'+err);
        }

       // if solc successfully loaded, compile the contract and get the JSON output
       var output = solc_specific.compile(input, is_optimized);
       // get bytecode from JSON output
       //console.log('Solc  >>> ', output);

       if (typeof output['contracts'][':'+cname] === 'undefined'){
         // if there are more than one contract in the contract file, then the JSON representation will have ":"
         // at the front, but if there is only the main contract, there won't, in which case the vaule assignment
         // above will be empty or undefined.
         if(typeof output['contracts'][cname] === 'undefined' ){
           res.end("Err132");
           return
         }

         var bytecode = output['contracts'][cname]['runtimeBytecode'];
       }
       else{
         if(typeof output['contracts'][':'+cname] === 'undefined' ){
           res.end("Err133");
           return
         }
         var bytecode = output['contracts'][':'+cname]['runtimeBytecode'];
       }

       if (parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[0].slice(1)) >= 4
        && parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[1].slice(1)) >= 7){
         // if solc version is at least 0.4.7, then swarm hash is included into the bytecode.
         // every bytecode starts with a fixed opcode: "PUSH1 0x60 PUSH1 0x40 MSTORE"
         // which is 6060604052 in bytecode whose length is 10

         var fixed_prefix= bytecode.slice(0,10);
         // every bytecode from compiler would have constructor bytecode inserted before actual deployed code.
         // the starting point is a fixed opcode: "CALLDATASIZE ISZERO"
         // which is 3615 in bytecode
         var starting_point = bytecode.search('3615');
         var remaining_part = bytecode.slice(starting_point);
         // a165627a7a72305820 is a fixed prefix of swarm info that was appended to contract bytecode
         // the beginning of swarm_info is always the ending point of the actual contract bytecode
         var ending_point = bytecode.search('a165627a7a72305820');
         // construct the actual deployed bytecode
         bytecode_from_compiler = '0x'+fixed_prefix + bytecode.slice(starting_point, ending_point);
       }
       else{
         bytecode_from_compiler = '0x'+bytecode;
       }
       // testify with result from blockchain until the compile finishes.
       var bytecode_from_blockchain = testify_with_blochchain(solc_version, contract_address);



       if (bytecode_from_blockchain == bytecode_from_compiler)
        res.end(JSON.stringify({bc:address}));
      else
        res.end(JSON.stringify({bc:"NA"}));

     });
   } catch (ex) {
    res.end(ex);
  }

 }//Func end

 function testify_with_blochchain(solc_version, contract_address){
   // using web3 getCode function to read from blockchain
   web3.eth.getCode(contract_address)


   .then(output =>{
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
 }//Func End


})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

//==============================//


const net_to_provider = {
        '1':'https://chain.hyperdapp.org',
        '2': 'https://ashoka.hyperdapp.org',
        '3': 'https://shivaji.hyperdapp.org',
        '4': 'https://chola.hyperdapp.org',
      }
