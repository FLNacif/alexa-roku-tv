/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const { sendMessage } = require("./util")


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Diga um comando ou peça ajuda.' ;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const TurnOnIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TurnOnIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Ligando...';
        try{
            sendMessage({command: 'PowerON'})
        }
        catch(e){
            speakOutput = 'Oops... Algo deu errado'
        }
        console.info(`Respondendo ${speakOutput}`)
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};  

const TurnOffIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TurnOffIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Desligando...';
        try{
            sendMessage({command: 'PowerOFF'})
        }
        catch(e){
            speakOutput = 'Oops... Algo deu errado'
        }
        console.info(`Respondendo ${speakOutput}`)
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const OpenAppIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OpenAppIntent';
    },
    handle(handlerInput) {
        let speakOutput = '';
        try{
            const appSlot = Alexa.getSlot(handlerInput.requestEnvelope, 'app');
            const appName = appSlot.value;
            const appId = appSlot.resolutions?.resolutionsPerAuthority[0]?.values[0].value.id;
            speakOutput = `Okay, irei abrir o ${appName}.`;
            sendMessage({command: 'OpenApp', app: {name: appName, id: appId}});
        }
        catch(e){
            speakOutput = 'Oops... Algo deu errado'
        }
        console.info(`Respondendo ${speakOutput}`)
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};  

const VolumeUpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VolumeUpIntent';
    },
    handle(handlerInput) {
        let speakOutput = '';
        try{
            const quantidade = Alexa.getSlotValue(handlerInput.requestEnvelope, 'quantidade') ?? 5;
            speakOutput = `Okay, aumentando o volume em ${quantidade}.`;
            sendMessage({command: 'VolumeUp', amount: quantidade});
        }
        catch(e){
            speakOutput = 'Oops... Algo deu errado'
        }
        console.info(`Respondendo ${speakOutput}`)
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};  

const VolumeDownIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VolumeDownIntent';
    },
    handle(handlerInput) {
        let speakOutput = '';
        try{
            const quantidade = Alexa.getSlotValue(handlerInput.requestEnvelope, 'quantidade') ?? 5;
            speakOutput = `Okay, diminuindo o volume em ${quantidade}.`;
            sendMessage({command: 'VolumeDown', amount: quantidade});
        }
        catch(e){
            speakOutput = 'Oops... Algo deu errado'
        }
        console.info(`Respondendo ${speakOutput}`)
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};  

const VolumeMuteIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VolumeMuteIntent';
    },
    handle(handlerInput) {
        let speakOutput = '';
        try{
            speakOutput = `Okay.`;
            sendMessage({command: 'VolumeMute'});
        }
        catch(e){
            speakOutput = 'Oops... Algo deu errado'
        }
        console.info(`Respondendo ${speakOutput}`)
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};  

const ChangeHDMIIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ChangeHDMIIntent';
    },
    handle(handlerInput) {
        let speakOutput = '';
        try{
            const channel = Alexa.getSlotValue(handlerInput.requestEnvelope, 'channel') ?? 1;
            speakOutput = `Mudando a entrada HDMI.`;
            sendMessage({command: 'ChangeHDMI', HDMIChannel: channel});
        }
        catch(e){
            speakOutput = 'Oops... Algo deu errado'
        }
        console.info(`Respondendo ${speakOutput}`)
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};  

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Eu posso ligar, desligar a TV, abrir um app, alterar o volume ou o HDMI. Basta dizer o que quer fazer.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Okay!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Desculpa, acho que não sou capaz de fazer isso ainda.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        TurnOnIntentHandler,
        TurnOffIntentHandler,
        OpenAppIntentHandler,
        VolumeUpIntentHandler,
        VolumeDownIntentHandler,
        VolumeMuteIntentHandler,
        ChangeHDMIIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();