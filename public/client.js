const socket=io();
let nam;
let textarea=document.querySelector('#textarea');
let messageArea=document.querySelector('.message_area');
do{
    nam=prompt("Enter your name.");
}while(!nam);

textarea.addEventListener('keyup',(e)=>{
    if(e.key  === 'Enter'){
        sendMessage(e.target.value);
    }
})

const sendMessage = (Message)=>{
    let msg={
        user:nam,
        message:Message.trim()
    }
    //apend the message
    appendMessage(msg,'outgoing');
    textarea.value='';
    scrollToBottom();

    //send to the server using websocket
    socket.emit('message',msg);
}
const appendMessage=(msg,type)=>{
    let mainDiv=document.createElement('div');
    let className=type;
    mainDiv.classList.add(className,'message');

    let markUp=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markUp;
    messageArea.appendChild(mainDiv);
}

//receive the messags
socket.on('message',(msg)=>{
    // console.log(msg);
    appendMessage(msg,'incoming');
    scrollToBottom();
})

const scrollToBottom=()=>{
    messageArea.scrollTop=messageArea.scrollHeight;
}