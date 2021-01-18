"use strict";

const eventEmitter = require('./events');
require('dotenv').config();
require('./caps') //to require the .on() 
let STORENAME = process.env.STORENAME;
let faker = require('faker');



const repeatedFunction = function () {
    let orderId = faker.random.uuid();
    let customerName = faker.name.firstName();
    let address = faker.address.city(); 
    let newObj = {
        STORENAME: STORENAME,
        orderId: orderId,
        customerName: customerName,
        address: address
    }
    eventEmitter.emit('pickup', newObj)
    return newObj
}

module.exports = repeatedFunction;



