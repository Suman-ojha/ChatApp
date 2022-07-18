const express=require('express');
const app=express();
const http=require('http').createServer(app);

const port=process.env.PORT || 8000;

//set middleware
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})



http.listen(port,()=>{
    console.log(`Listening to the ${port}..`);
})


//socket
const io=require('socket.io')(http);
io.on('connection',(socket)=>{
    console.log('connected socket..');
    socket.on('message',(msg)=>{
        // console.log(msg);
        socket.broadcast.emit('message',msg);
    })
})
