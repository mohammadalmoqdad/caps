'use strict';

require('dotenv').config();


const io = require('socket.io-client');
const caps = io.connect(`http://localhost:3000/caps`);

caps.on('pickup', (payload) => {
  setTimeout(() => {
    console.log(`picked up ${payload.orderId}`);
    caps.emit('in-transit', payload);
  }, 1500);

  setTimeout(() => {
    console.log(`delivered up ${payload.orderId}`);
    caps.emit('delivered', payload);
  }, 3000);
});


































// const net = require('net');
// const client = new net.Socket();

// const host = process.env.HOST || 'localhost';
// const port = process.env.PORT || 3000;


// client.connect(port, host, () => {
//     console.log("DRIVER CONNECT MSG");
// })



//     client.on('data', (data) => {
//         let msg = JSON.parse(data); 
//         if (msg.event == "pickup") {
//             setTimeout(function () {
//                 console.log(`DRIVER: picked up ${msg.payload.orderId}`)
//                let newObj = JSON.stringify({
//                    event: "in-transit",
//                    payload : msg.payload
//                }) 
//                client.write(newObj);

//             }, 1000);

//             setTimeout(function () {
//                let newObj = JSON.stringify({
//                    event: "delivered",
//                    payload : msg.payload
//                }) 
//                client.write(newObj);

//             }, 3000);



//         }

//     })
