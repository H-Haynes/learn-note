# Koa API

[toc]

## 创建

和Express类似

```javascript
   import Koa from "koa"
   import http from "http"
   const app = new Koa();
   const server = http.createServer(app.callback());

   server.listen(port,callback)

   // 简易

   const app = new Koa();
   app.listen(port,cb)
```

## 中间件

```javascript 
    app.use((ctx,next)=>{
      console.log("中间件1")
      next()
    })

    app.use((ctx,next)=>{
      console.log("中间件2")
    })

```

Koa如果没有响应，默认会设置为404，express 客户端则会一直等待,且status为200

### context

`req`:http模块内置对象,一般不使用
`res`: http模块内置对象，一般不使用
`request`: koa封装的请求对象，用于获取请求传递的信息
`response`:koa封装的响应对象，用于设置响应信息

响应就是对response.body赋值

几个属性生身的app和外面的app相等，当使用模块化时，可以从这些属性上得到app

