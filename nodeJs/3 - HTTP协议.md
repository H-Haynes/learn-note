# 协议

[toc]

## 七层网络协议

+ **应用层**
  + 终端设备,其协议由自己定，HTTP协议，DNS（域名解析）协议,FTP（文件传输）协议,SMTP（邮件传输）协议等
+ **表示层**
  + 加密，格式转换
+ **会话层**
  + 解除或者建立与其他节点的联系
+ **传输层**
  + 交换机之类,TCP协议，UDP协议等
+ **网络层**
  + 你所在的网络节点，IP(网络层)协议等
+ **数据链路层**
  + APM协议，FDDI协议等
  + 分为逻辑链路子层和媒体访问控制子层（MAC）
+ **物理层**
  + OSI的物理层规范（如电流多大）

A --> B的传输是应用层到物理层层层加密的过程，那么B在拿到数据时就是从物理层到应用层层层解密的过程，顺序不能错误

## 五层网络协议

五层网络协议是将去掉了表示层和会话层，这两层没有协议

## HTTP协议

 HTTP协议全称超文本传输协议(Hyper Text Transform Protocol)  
在控制台输入  
`curl 网址`就会得到网站的页面内容  
`cur -i 网址`  得到页面内容和响应头  

    HTTP协议需要一个发送（Request和一个返回(Response)，Request包含请求头和请求体，Response也包含响应头和响应体

### 请求头

请求头包含了:  
请求方式 url/协议/协议版本  （注意请求方式后面紧跟空格和url）  
Host(主机名):xxx.xxx.xxx.xxx:端口号  
Connection(链接方式):  
Content-Length(请求体大小,如果是文件传输则会有此项):  
Cache-Control(缓存控制,文件传输有此项):
Origin(源,文件传输有此项):  
Content-Type(内容类型):  multipart/form-data;boundary= ----WebkitFromBoundaryxxxxxxxx（**二进制分隔符**）
UserAgent(浏览器信息):  
Accept(指定本机接收的数据类型):  
Refer(从哪里来,当前页面地址):  
Accept-Encoding(接受的编码方式):  
Accept-Language(接受的语言):

如果是POST请求，那么携带的数据在请求体中,GET则在url中

### 请求体

请求体有两种格式：文本格式和二进制格式，二进制格式下会有二进制分隔符，如图片传输就是二进制  

got Data: ----WebkitFromBoundaryxxxxxxx(**二进制分隔符，达标从此处进入数据体**)  
Content-Disposition(一些数据):  
Content-Type(传输的文件类型):image/png  
    xxxx此处为二进制数据xxxxx  
 直到再次出现**二进制分隔符**，代表数据传完了  
Content-Disposition（其他数据）:  
再次出现**二进制分隔符**且紧跟--,则请求体结束:  

    ----WebkitFromBoundaryxxxxxxxxx--

### 响应头

协议/协议版本/状态码 状态
Accept-Ranges(范围单位):bytes  
Cache-Control(缓存控制):  
Connection(连接方式):  
Content-Length:  
Content-Type:  
Date(响应时间):  
Etag(标记，用来和下次请求比对):  
Last-modified(最后修改时间):  
Pragma:no-cache  
Server(服务器):  
Set-Cookie(设置缓存):  

    Cache-Control:

    可否缓存
    public: 可以被任意中间层缓存，如代理服务器等;
    private:仅能被一个东西缓存，服务器可以，代理服务器不可以
    no-cache:不可相信缓存，使用缓存前需先向服务器验证
    only-if-cached:只要有缓存就不向服务器请求

    到期时间
    Max-age:魂村的最大周期(单位:秒)
    Max-stale:表示客户端愿意接收过期的资源，但是响应必能超过设置的过期时间
    Min-fresh:客户端希望在指定时间获得最新响应

    重新验证加载
    Must-revalidate:使用缓存前必须验证资源的状态,如果资源过期则不能使用
    Proxy-revalidate:和Must-revalidate作用一致，适用于共享缓存,如代理服务器

    No-Store:禁止使用缓存
    No-transform：禁止对缓存资源进行更改转码等
