# http 模块

## 介绍

http模块是基于net模块的，它比net更加方便
无需手动管理socket，无需手动组装消息格式

## 发送请求 request

`http.request()`参数

+ url 不可向https发送请求
+ options
  + method
  + ...
+ response 响应结果回调

```javascript
    const request =  http.request('http://m.baidu.cn',{
        method:'GET'
    },res=>{
        console.log(res)
    })
    request.end()
```

## 创建服务器

`http.createServer()`参数

+ option 可选
+ listener 监听函数 可选

```javascript

```

### 如何搭建静态资源服务器?

代码请见[如何搭建镜台服务器](./demo/12.js)
