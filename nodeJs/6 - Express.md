# Express

[toc]

## 为什么使用express

http模块实际用得并不多，在很多方面有很大的局限性，很难实现功能，比如上传文件，所以更多的是使用其他框架来实现这些功能，express就是一个很好的框架

## 使用express

### 搭建静态文件服务器

    //静态资源服务器
    const express = require('express');
    let app = new express();
    app.use(express.static('./page'));
    app.listen(8088)
仅用四行就能开启服务，使用http则需要较多的代码
app有get和post方法，分别对应相应的请求方式,

#### app.get、app.post请求

该方法接收两个参数，第一个参数为接口的名字，第二个为一个函数，这个函数也有两个参数，分别是:request和response
这二者和http里的内容一致

#### 参数读取

想要获取到请求的参数，get和post的获取方式不同：  

* GET  get方式的请求可以使用url依赖包来解析，使用`request.parse(request.url,true).query`来取得data对象（因为GET请求的数据是拼接在url的），也可以使用它来获取cookie等数据;
* POST  post请求的数据需要使用body-parser依赖包:

        const bodyParser = require('body-parser');
        app.use(bodyParser.json({limit:'1mb'}));//设置解析json格式数据
        app.use(bodyParser.urlencoded({extended:false}));//参数编码，必须在上一项后面

这样在请求中就能使用request.body来获取到了（踩坑提醒:axios的记得post使用qs模块的stringify来转换数据）

## Cookie操作

想要操作cookie，需要下载cookie-parser模块，并在项目中引入:  `npm i cookie-parser -D`
`const cookie = require('cookie-parser')`

### 读取cookie

想要读取cookie自然是在请求中来获得cookie，我们都知道浏览器在发送请求时会将cookie也携带发送，所以可以在cookie中读取到:  
   `request.cookies.xxx`
 小示例：

    实现收到的请求如果cookie包含id字段，则让请求继续，否则跳转至登录页  
    app.get('/api/*',function(request,response,next){
        if(request.cookies.id){
            next()
        }else{
            response.redirect('/login')
        }
    })
注意上面的api可以作为拦截器（仅拦截/api下的所有请求进行处理）,next代表是否继续，和vue的导航守卫类似

注意：Axios请求默认是不懈怠cookie的，需要设置with   Credentials和后端设置相应的配置，具体设置请百度详情

### 设置cookie

设置cookie就非常简单了,设置cookie是在返回中进行的：
`response.cookie('cookieName','cookieVlue')`

## 以前的文件上传操作

### 前端部分

页面使用form表单+input(file)来实现：  
`let file = document.getElementById("file").files[0];   //获取文件内容`
`let data = new FromData()`
`data.append('file',file)`
然后使用xhr将data发送出去，注意文件上传必须使用 post
`xhr.open('POST','/uploadFile',true)`
`xhr.send(data)`

### 后端部分

后端需要设置`uploadFile`接口,使用request监听data事件，从而获取到post传递的数据

    function uploadFile(request,response){
        request.on('data',function(data){`
            let fis = fs.createWritesStream("./file/a.png");        //文件写操作，不存在则创建
            fis.write(data);    //将收到的数据写入文件
            fis.end();
            response.end()
        })
    }
如此就能将文件收到并写入指定文件了；但是：上传的是图片，我们去查看写入的这个文件时（a.png），却发现图片错误了

所以到底写入了什么呢？将data打印出来，可以看到除了文件的二进制数据，还包含了一些其他的东西向，如Content-Type等，还能看到熟悉的二进制分隔符，是的，这就是http协议的格式，http能解析请求头,但是无法解析文件内容主体，所以，需要使用更加请打的包（express）

## Express的文件上传下载

需要依赖于multer包，因此需要下载并引入:
`npm i multer`
`const multer = require('multer')`

### 文件上传

先要确定想将文件存储在数据库还是在本地磁盘，如果是想要存储在本地磁盘，需要进行相应的设置:
`let uploadSingle = multer({dest:'./file'})`设置存储位置(当前目录下的file目录)

