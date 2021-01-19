require('dotenv').config();


const net = require('net');
const client = new net.Socket();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;


client.connect(port, host, () => {
    console.log("DRIVER CONNECT MSG");
})



    client.on('data', (data) => {
        let msg = JSON.parse(data); 
        if (msg.event == "pickup") {
            setTimeout(function () {
                console.log(`DRIVER: picked up ${msg.payload.orderId}`)
               let newObj = JSON.stringify({
                   event: "in-transit",
                   payload : msg.payload
               }) 
               client.write(newObj);

            }, 1000);

            setTimeout(function () {
               let newObj = JSON.stringify({
                   event: "delivered",
                   payload : msg.payload
               }) 
               client.write(newObj);

            }, 3000);



        }

    })
