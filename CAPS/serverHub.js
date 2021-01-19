'use strict';

const net = require('net');
const port = process.env.PORT || 3000;
 const uuID = require('uuid');
const server = net.createServer();
server.listen(port, ()=> console.log(`server is running on ${port}`));

let socketPool = {}; // define it outside f the connection just to avoid remove the data insede it each time.

server.on('connection', (socket)=> {
    //Accept inbound TCP connections on a declared port

    console.log("SERVER GOT A CONNECTION!");
    // console.log(socket); this like the object of response and request!!     

    // giving each client a unique ID
    const id = `Socket-${Math.random()}`;
    socketPool[id] = socket;
    console.log("/////////////////// uuid: ",uuID.NIL);
   
    socket.on('data', (buffer)=> dispatchEvent(buffer));   //Read and parse the incoming data/payload
    socket.on('error', (e)=> console.log('SOCKET ERROR', e));
    socket.on('end', (e)=> delete socketPool[id]);
});


function dispatchEvent(buffer) {
    
    console.log("buffer >>>>>> ", buffer);
    let msg = JSON.parse(buffer.toString().trim()); //format msg
    console.log("msg >>>> ", msg);

     broadcast(msg); //send to all clients

}



function broadcast(message) {
    let payload = JSON.stringify(message);
    for (let socket in socketPool) {
        socketPool[socket].write(payload);
    }
}