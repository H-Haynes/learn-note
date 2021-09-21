# net 模块

[toc]

## 作用

`net`是一个通信模块，可以用来：

1. 进程之间的通信（IPC）
2. 网络通信（TCP/IP）

## 创建客户端

`net.createConnection(option,Listener)`,
返回值为Socket对象

socket是一个特殊文件，在node中表现为一个双工流对象，通过向流写入内容发送数据，监听流的内容获取数据

```javascript
let chunkData = ""
const work = net.createConnection({
    port:"80",
    host:"m.baidu.cn",
},()=>{
    console.log("链接成功")
}).on('data',data=>{
    chunkData += data;
    console.log("收到信息",data.toString())
    if(){//判断请求头中content-length长度是否等于chunkData 的byteLength,等于则表示内容已经收取完毕

    }
})

// 请求方式是包含在请求行中的
work.write(`GET / HTTP/1.1        //请求行
Host:m.baidu.cn,                //请求头
Connection:keep-alive


请求体`) //请求体非必需，但空两行是必须的,
work.end()

```

## 创建服务器

`net.createServer()`

+ `listen(port)` 监听端口
+ `on`
  + listening 监听事件
  + connection 有服务端连接

返回Server对象
