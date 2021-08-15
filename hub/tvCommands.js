module.exports.TurnOn = () => {
    const { createMagicPacket, request } = require('./util.js')
    const dgram = require('dgram')
    
    var magicPacket = createMagicPacket('54:f1:5f:7e:a1:80');
    var protocol = 'udp4';
    var socket = dgram.createSocket(protocol);

    socket.send(magicPacket, 0, magicPacket.length, 9, '255.255.255.255', function(error) {
        if(error)
            console.error(error)
    });
    request('POST', '/keypress/PowerOn');
}

module.exports.TurnOff = () => {
    const { request } = require('./util')

    request('POST', '/keypress/PowerOff');

}

module.exports.OpenApp = (app) => {
    const { request } = require('./util')

    request('POST', `/launch/${app.id}`);
}

module.exports.AumentarVolume = async (qtd) => {
    const { request, delay } = require('./util')

    for(let i=0; i<qtd; i++){
        request('POST', '/keypress/VolumeUp')
        await delay(250)
    }
}

module.exports.DiminuirVolume = async (qtd) => {
    const { request, delay } = require('./util')

    for(let i=0; i<qtd; i++){
        request('POST', '/keypress/VolumeDown')
        await delay(250)
    }
}

module.exports.MutarVolume = () => {
    const { request } = require('./util')
    request('POST', '/keypress/VolumeMute')

}

module.exports.MudarHDMI = (HDMINumber) => {
    const { request } = require('./util')

    request('POST', `/keypress/InputHDMI${HDMINumber}`)
}