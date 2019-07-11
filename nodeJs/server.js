const net = require("net");
const server = net.createServer();
server.listen(10020,"127.0.0.1");
server.on('listening',function(){
    console.log("服务器地址信息:"+JSON.stringify(server.address()))
    console.log("服务已经启动")
})
server.on("connection",function(socket){
    console.log("收到新的连接请求");
    socket.on("data",res=>{
        console.log("客户端发来的消息内容是:"+res.toString());
        socket.write("我已经收到客服端的消息了")
    })
    socket.on("close",_ =>{
        console.log("客户端已关闭连接")
        server.close();//服务端也关闭
    })
})
server.on("close",_=>{  //监听服务端自己关闭 事件
    console.log("服务关闭")
})