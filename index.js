const express = require('express');
//socket
const socket = require('socket.io');


const app = express();

const server = app.listen(4000, () => {
    console.log('listening to requests ')
})

app.use(express.static('public'))

//make socket listen to server 
//setup socket in backend
const io = socket(server);

//it is the channel bet. frontend and backend-> 
//fire when frontend start the connection  
io.on('connection', (socket) => {
    console.log("made socket connection",socket.id)
    socket.on('chat',(data)=>{
        // console.log(data)
//io.sockets refers to all the clients in chat-> each client have a socket
//.emit('chat',data) ---> send data to all clients in the chat
        io.sockets.emit('chat',data)                  //if A send a message to B this message will be send to all chatters in this chat
    })
    socket.on('typing',(data)=>{
        // console.log('from server',data)
        if(data.messageOwner)
        //socket --> is the client who send message now
        //socket.broadcast.emit ---> to display the feedback in chat of clients except the sender
        socket.broadcast.emit('typing',data)
        data.messageOwner=""
    })
})