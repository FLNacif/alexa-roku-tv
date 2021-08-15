const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const { v4: uuidv4 } = require('uuid');

module.exports.sendMessage = async function sendMessage(message){
    const sqs = new SQSClient({
        region: 'us-east-1',
    })
    
    message = {...message,
        uniqueId: uuidv4()
    }

    try{
        await sqs.send(new SendMessageCommand({
            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/277213242661/AlexaRokuTV.fifo',
            MessageGroupId: 'default',
            MessageBody: JSON.stringify(message),
        }))
        console.log('Message sended', message )
    }catch(err){
        console.error(err)
        throw err;
    }
    
}