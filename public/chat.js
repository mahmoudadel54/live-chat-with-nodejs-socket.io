//setup socket in front-end
//make a socket connection in frontend

var socket = io.connect('http://localhost:4000');

//DOM element
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

    
//events
btn.addEventListener('click',()=>{
    //when click on btn socket will create a message and send the data
    if(message.value&&handle.value)
    socket.emit('chat',{        //chat is the message that backend will listen to and recieve its data
        //sent data from front-end to backend
        message: message.value,
        handle: handle.value
    })
    message.value=""
})

message.addEventListener('keypress',()=>{
    if(message.value)
    socket.emit('typing',{
        messageOwner:handle.value,        
        message:message.value
    }
    );
})
//listen emit

socket.on('chat',(data)=>{
    feedback.innerHTML=""
    output.innerHTML += `<p><strong>`+data.handle + `:</strong>`+ data.message +`</p>`
})

socket.on('typing',(data)=>{
    // console.log(data)
    if(data.message===""){
        feedback.innerHTML.value=""
    }else{
        feedback.innerHTML = `<p><em>`+data.messageOwner+ ` is typing a message ....` +`</em><p>`
    }
})