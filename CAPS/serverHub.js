'use strict';

const net = require('net');
const port = process.env.PORT || 3000;
const server = net.createServer();
server.listen(port, ()=> console.log(`server is running on ${port}`));

let socketPool = {}; // define it outside f the connection just to avoid remove the data insede it each time.

server.on('connection', (socket)=> {
    //Accept inbound TCP connections on a declared port
    console.log("SERVER GOT A CONNECTION!");

    // giving each client a unique ID
    const id = `Socket-${Math.random()}`;
    socketPool[id] = socket;
   
    socket.on('data', (buffer)=> dispatchEvent(buffer));   //Read and parse the incoming data/payload
    socket.on('error', (e)=> console.log('SOCKET ERROR', e));
    socket.on('end', (e)=> delete socketPool[id]);
});


function dispatchEvent(buffer) {
    
  
    let msg = JSON.parse(buffer.toString().trim()); //format msg
    console.log("Event : ", msg);

     broadcast(msg); //send to all clients

}



function broadcast(message) {
    let payload = JSON.stringify(message);
    for (let socket in socketPool) {
        socketPool[socket].write(payload);
    }
}