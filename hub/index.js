(async function() {
    const { receiveMessage, delay, log } = require("./util")
    
    try {
        log('Esperando mensagens...')
        while(true){
            try{
                const msgs = await receiveMessage()
                if(!msgs) {
                    delay(2000)
                } else {
                    msgs.forEach(msg => handleMsg(JSON.parse(msg.Body)));
                }
            } catch(ex) {
                console.error(ex)
            }
        }
    } catch(err) {
        console.error("Receive Error", err);
    }
    
}());

function handleMsg(msg){
    const { log } = require("./util")
    const { TurnOn, TurnOff, OpenApp, AumentarVolume, DiminuirVolume, MutarVolume, MudarHDMI } = require('./tvCommands.js')

    switch (msg.command) {
        case 'PowerON':
            log('Ligando TV.')
            TurnOn()
            break
        case 'PowerOFF':
            log('Desligando TV')
            TurnOff()
            break
        case 'OpenApp':
            log(`Abrindo o app ${msg.app.name}`)
            TurnOn()
            OpenApp(msg.app)
            break
        case 'VolumeUp':
            log('Aumentando o volume')
            AumentarVolume(msg.amount)
            break;
        case 'VolumeDown':
            log('Diminuindo o volume')
            DiminuirVolume(msg.amount)
            break;
        case 'VolumeMute':
            log('Mutando/desmutando o volume')
            MutarVolume()
            break;
        case 'ChangeHDMI':
            log(`Mudando para o HDMI ${msg.HDMIChannel}`)
            MudarHDMI(msg.HDMIChannel)
            break;
    }
}