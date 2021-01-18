
const eventEmitter = require('./events');

eventEmitter.on('pickup', payload => logIt('pickup', payload));
eventEmitter.on('in-transit', payload => logIt('in-transit', payload));
eventEmitter.on('delivered', id => consoleResult(id));


function logIt(event, payload) {
    let date = new Date();
    date = date.toUTCString();
    console.log({ event, date, payload });
}


function consoleResult(id) {
    console.log(`thank you ${id}`)
}