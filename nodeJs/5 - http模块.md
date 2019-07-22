# http

## 使用

在已有node环境下，使用require语句引入即可：  
    `const http = require('http')`
使用http创建一个服务,其参数为一个函数，函数中有两个参数，分别是request和response，request可以获取到客户端向服务器发送的数据信息，而response则可以向客户端返回信息
    `http.createServer((request,response)=>{
    }).listen("8080")`
当然，还得设置这个服务监听的端口;

## request

request包含了客户端向服务端发来的请求信息，如参数：request.url,但是这是一个字符串，如name=123&age=11，如果不想手动拆分他们的话，可以使用url模块:
    `const url = require('url)`
    `let params = url.parse(request.url,true).query`
如此我们拿到的就是一个对象了
如果是post请求，则需要监听data事件：
    request.on('data',function(data){})

## response

response用于服务端向客户端通信，如设置返回的内容:
    `response.write({`
         ` msg:'返回成功'`
    `})`
当然也可以设置返回类型等:
    `response.writeHead('Access-Control-Allow-Origin','*')`
    `response.write(302,{'location','/login'})`
    `response.write({'Set-Cookie':'name=he'})`
注意要在返回之后结束掉它
    resonse.end()

