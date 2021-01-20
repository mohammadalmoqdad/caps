require('dotenv').config();
let faker = require('faker');
const io = require('socket.io-client');

const caps = io.connect(`http://localhost:3000/caps`); // connect to namespace

let STORE_NAME = process.env.STORENAME || `1-206-flowers`;

// creating room, room is called as the store name
let channel = STORE_NAME;
console.log(channel);
caps.emit('join', channel);




// when someone joined the room in the namespace /caps
caps.on('joined', (joinedChannel) => {
    console.log(`Joined Room: ${joinedChannel}`);
    channel = joinedChannel;
});



caps.on('delivered', (payload) => {
    console.log(`Thank you for delivering ${payload.orderId}`);
});





// create order each 5 seconds and emit it
const generateOrder = () => {
    let payload = {
        storeName: STORE_NAME,
        orderId: faker.random.uuid(),
        customerName: faker.name.findName(),
        address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
    };

    caps.emit('pickup', payload); // emit message to tha caps server with event 'pickup'
};

setInterval(generateOrder, 5000);















// const objectCreation = function () {

//     let orderId = faker.random.uuid();
//     let customerName = faker.name.firstName();
//     let address = faker.address.city();
//     let newObj = {
//         STORENAME: STORENAME,
//         orderId: orderId,
//         customerName: customerName,
//         address: address
//     }

//     let msg = JSON.stringify({ event: "pickup", payload: newObj });
//     client.write(msg);

// }



// client.connect(port, host, () => {
//     console.log("VENDOR CONNECT MSG");
// });

// setInterval(objectCreation, 5000);

// client.on('data', (data) => {
//     const msg = JSON.parse(data);
//     if (msg.event == "delivered") console.log(`thank you for delivering ${msg.payload.orderId}`)
// });


// client.on('close', () => console.log("Logger connection CLosed"));
// client.on('error', (e) => console.log("Logger Error", e));
