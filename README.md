# Alexa Roku TV
This project aims to control a Roku TV through Alexa since there is no native integration.

This was used as home project to learn, so it is not generic.

This project contains only files needed to make the project work, I do not provide scripts to deploy AWS resources or Alexa Skill.

This project DON'T:
- Do Device discovery
- Use Alexa Smart Home Skill
- Do IP/MAC configuration

If you wan't to use this application as is, configure the MAC address (used to perform Wake On Lan) and configure a reserved IP for your TV on source code.

## Architecture

As the main goal was to keep it simple, we use a queue (AWS SQS) to integrate Alexa-lambda to my home network through the 'HUB' (just a pooling application).

This HUB is responsible to pool the queue and then translate the command to the necesary requests.


[TODO Image]

## Run

To run the hub, just have a Node 14.x+ installed, and run
```
npm install
```
to install dependencies and then run
```
node index.js
```
to start application.

## Need help?
Open an issue and I will try to help you, but I am a newbie either.

## Want to help me?
Feel free to contribute, or just make a fork.
