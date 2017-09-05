'use strict';
var AWS = require('aws-sdk');
var fh = new AWS.Firehose();


 funct(record){
   fh.putRecord({
     DeliveryStreamName:process.env.LOG_STREAM_NAME,
     Record:{Data:new Buffer(JSON.stringify(record)+"\n")}
   });
 }
  exports.handler = (event, context, callback) => {
 if (typeof context.identity !== 'undefined') {
       console.log('Cognito identity ID =', context.identity.cognitoIdentityId);
 }
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
        },
    });
   var success={
     state:"ok",
     description:"test"
   };
    switch (event.httpMethod) {
        case 'POST':
            putToStream(JSON.parse(event.body));
            done(null,success);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};
