const { SQS } = require("@aws-sdk/client-sqs");

module.exports.receiveMessage = async function receiveMessage(){
    const queueURL = 'https://sqs.us-east-1.amazonaws.com/277213242661/AlexaRokuTV.fifo';
    
    const sqs = new SQS({
        region: 'us-east-1',
    })
    
    try{
        const message =  (await sqs.receiveMessage({
            QueueUrl: queueURL,
            WaitTimeSeconds: 20
        }))?.Messages

        if(message){
            module.exports.log('Uma nova mensagem')
            var deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: message[0].ReceiptHandle
            };

            try {
                await sqs.deleteMessage(deleteParams)
            } catch(err) {
                console.log(`Falha ao deletar ${message.length} messagem(ns)`)
            }
        }
        return message
    }catch(err){
        console.error(err)
        throw err;
    }
    
}

module.exports.delay = ms => new Promise(resolve => setTimeout(resolve, ms))
module.exports.log = str => console.log(`[${new Date().toLocaleString()}] ${str}`)
module.exports.createMagicPacket = function(macAddress) {
    const { Buffer } = require('buffer');

    const macBytes = 6
    var macBuffer = Buffer.alloc(macBytes);
    var i;
    var numMacs = 16;
    var buffer = Buffer.alloc((1 + numMacs) * macBytes);
    
    if(macAddress.length === (2 * macBytes + (macBytes - 1))) {
      macAddress = macAddress.replace(new RegExp(macAddress[2], 'g'), '');
    }
    
    if(macAddress.length !== (2 * macBytes || macAddress.match(/[^a-fA-F0-9]/))) {
      throw new Error('malformed MAC address \'' + macAddress + '\'');
    }
  
    for(var i = 0; i < macBytes; ++i) {
      macBuffer[i] = parseInt(macAddress.substr((2 * i), 2), 16);
    }
    
    for(var i = 0; i < macBytes; ++i) {
      buffer[i] = 0xff;
    }
    
    for(var i = 0; i < numMacs; ++i) {
      macBuffer.copy(buffer, (i + 1) * macBytes, 0, macBuffer.length);
    }
    
    return buffer;
  };

module.exports.request = function request(method, path){
    const http = require('http');

    var options = {
        'method': method,
        'hostname': '192.168.15.7',
        'port': 8060,
        'path': path,
        'headers': {
        },
        'maxRedirects': 20
      };
    var req = http.request(options);

    req.end();
}