const net = require('net');
const socket = net.connect(10020,"127.0.0.1");
socket.on('connect',function(){
    console.log('已成功连接服务器');
    //
})
socket.on('error',err=>{
    console.log(err)
})
socket.on('data',data=>{
    console.log(data.toString());
    socket.end();//客户端关闭连接
})
socket.on('close', _ =>{
    //用来监听服务器关闭连接
    console.log('服务器也关闭了连接')
})
socket.write('向服务端发送数据');
