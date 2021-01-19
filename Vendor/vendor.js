require('dotenv').config();
let faker = require('faker');

const net = require('net');
const client = new net.Socket();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;


let STORENAME = process.env.STORENAME;
const objectCreation = function () {

    let orderId = faker.random.uuid();
    let customerName = faker.name.firstName();
    let address = faker.address.city();
    let newObj = {
        STORENAME: STORENAME,
        orderId: orderId,
        customerName: customerName,
        address: address
    }

    let msg = JSON.stringify({ event: "pickup", payload: newObj });
    client.write(msg);

}



client.connect(port, host, () => {
    console.log("VENDOR CONNECT MSG");
});

setInterval(objectCreation, 5000);

client.on('data', (data) => {
    const msg = JSON.parse(data);
    if (msg.event == "delivered") console.log(`thank you for delivering ${msg.payload.orderId}`)
});


client.on('close', () => console.log("Logger connection CLosed"));
client.on('error', (e) => console.log("Logger Error", e));
