var AWS = require('aws-sdk');


var params = {
  TableName : 'Table',
  Item: {
     hashkey: 'haskey',
     NumAttribute: 1,
     BoolAttribute: true,
     ListAttribute: [1, 'two', false],
     MapAttribute: { foo: 'bar'},
     NullAttribute: null
  }
};

var docClient = new AWS.DynamoDB.DocumentClient();

//console.log(">", dynamodb)
//var docClient = dynamodb.DocumentClient({ service: dynamodb });

docClient.put(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});
