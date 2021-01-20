'use strict';


const port = process.env.PORT || 3000
const io = require('socket.io')(port);


capsNameSpace(io);


io.on('connection', (socket) => {
    console.log("This is the GLOBAL connection ! ");
    console.log("DEFAULT NAMESPACE ! ")

    socket.on("error", (payload) => {
        io.emit("error", payload);
    })

    socket.on("action", (payload) => {
        console.log("from server payload>>>", payload);
        io.emit("action", payload);
    });

    socket.on('pickup', (payload) => {
        let obj = {
            event: 'pickup',
            time: new Date().toLocaleTimeString(),
            payload
        }
        console.log('EVENT ', obj);
        caps.emit('pickup', payload);
    });

});


function capsNameSpace(io) {
    const caps = io.of('/caps'); //create my namespace

    let currentRoom = '';
    caps.on('connection', (socket) => { // whenever a connection to my nameSpace happens:
        console.log('Caps Namespace');
        socket.on('join', (room) => {
            socket.leave(currentRoom);
            socket.join(room);
            currentRoom = room;

            io.emit('action', `Someone Joined Room : ${room}`);
            caps.to(`${socket.id}`).emit('joined', room);
        })




        socket.on('pickup', (payload) => {
            let obj = {
                event: 'pickup',
                time: new Date().toLocaleTimeString(),
                payload
            }
            console.log('EVENT ', obj);
            caps.emit('pickup', payload);
        });





        socket.on('in-transit', (payload) => {
            let obj = {
                event: 'in-transit',
                time: new Date().toLocaleTimeString(),
                payload
            }
            console.log('EVENT ', obj);
            caps.to(currentRoom).emit('in-transit', payload);
        });






        socket.on('delivered', (payload) => {
            let obj = {
                event: 'delivered',
                time: new Date().toLocaleTimeString(),
                payload
            }
            console.log('EVENT ', obj);
            caps.to(currentRoom).emit('delivered', payload);
        });

    });

}



module.exports = io;

















// const net = require('net');
// const port = process.env.PORT || 3000;
// const server = net.createServer();
// server.listen(port, ()=> console.log(`server is running on ${port}`));

// let socketPool = {}; // define it outside f the connection just to avoid remove the data insede it each time.

// server.on('connection', (socket)=> {
//     //Accept inbound TCP connections on a declared port
//     console.log("SERVER GOT A CONNECTION!");

//     // giving each client a unique ID
//     const id = `Socket-${Math.random()}`;
//     socketPool[id] = socket;

//     socket.on('data', (buffer)=> dispatchEvent(buffer));   //Read and parse the incoming data/payload
//     socket.on('error', (e)=> console.log('SOCKET ERROR', e));
//     socket.on('end', (e)=> delete socketPool[id]);
// });


// function dispatchEvent(buffer) {


//     let msg = JSON.parse(buffer.toString().trim()); //format msg
//     console.log("Event : ", msg);

//      broadcast(msg); //send to all clients

// }



// function broadcast(message) {
//     let payload = JSON.stringify(message);
//     for (let socket in socketPool) {
//         socketPool[socket].write(payload);
//     }
// }