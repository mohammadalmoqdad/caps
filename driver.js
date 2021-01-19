const eventEmitter = require('./events');
const eventsEmmiter = require('./events')

function allFunctions(payload) {

    setTimeout(function () {
        console.log(`DRIVER: picked up ${payload.orderId}`)
        eventsEmmiter.emit("in-transit", payload)
    }, 1000);

    setTimeout(function () {
        console.log("delivered");
        eventEmitter.emit("delivered", payload.orderId)
    }, 3000)

}

module.exports = allFunctions;