# HTML5

[toc]

## 标签/属性

HTML5对HTML标签进行了语义化，新增较多的标签，都有各自的语义
`Contenteditable`:设置为true可以对标签进行编辑，默认为false,此属性会继承
`draggable`:是否使元素能够拖拽,true为可拖动，默认为false
`hidden`:元素隐藏
`data-value`:自定义属性

input新增类型：

- `calendar`：日期类：兼容性差
- `date`:日期，年月日
- `time`:时间，时分秒
- `week`：第几周
- `number`:兼容性差
- `email`：邮件
- `range`:拖动的滑动条
- `search`:

## 拖拽

在元素上设置draggable属性就表示这个元素可以被拖动了，chrome,safaire支持，无法被通用

拖拽事件

- `dragstart`:开始被拖拽时触发   按下不触发
- `dragend`:拖拽结束时触发
- `drag`：拖拽时触发

释放区事件:

- dragenter:拖拽元素进入释放区时触发 非元素进入触发，而是鼠标进入才触发
- dragover：拖拽元素在释放区移动时触发
- dragleave:拖拽元素离开释放区时被触发
- drop:拖拽元素在释放区松开时触发

可以配合js实现滑块拖动验证码效果
**dragover事件会阻止drop事件，要注意对其进行阻止默认事件**

## requestAnimationFrame动画优化

问题场景模拟：
我们使用定时器做一个运动:
  box初始位置为0,0，我们让他每次运动150px，运动到800px，以前我们使用的是setInterval，间隔太大的话会看上去很迟钝，所以会把时间设置很快，我们设为10ms
     `if(box.offsetLeft<800)box.style.left+=150+"px"`
浏览器的渲染速度是1s渲染60次，差不多1000/60=16.66ms渲染一次
第一次执行定时器时，时间为0，位置为0,0,要到的位置为150，box位置跳转到150，
第二次执行定时器时，时间为10,位置为150+150，但是浏览器渲染速度没有跟上(10比浏览器的16.66快)，所以本次重绘没有执行，box位置还是150，
第三次执行定时器，时间为20，位置为300+150，本次浏览器已经可以进行渲染了，所以它会把box位置跳转到450…

通过这个过程我们发现，box从150-300这个过程被省略了！这就是**丢帧**

HTML5新增的requestAnimationFrame就能解决这个bug

- requestAnimationFrame和定时器类似，但是它不用传时间;
- requestAnimationFrame也需要清理，使用cancelAnimatiomFrame来清除
- 另外需要注意它的兼容性，在高版本的浏览器兼容性才比较好
- requestAnimationFrame的执行时间是在每次重绘(1000/60)，因此兼容性的写法是使用setInterval(fn,1000/60)来处理不兼容的情况

区别：

- requestAnimationFrame可以准时的执行每一帧
- setInterval如果上一帧未执行完，下一帧就不执行

## Storage

[点击查看]('./网络.md')

## History

通过修改hash和hashchange事件来实现历史记录管理(vue)

- pushState 添加一条历史记录
  - `history.pushState(state,title,url)`
- replaceState 替换当前的历史记录
  - history.replaceState(state,title,url);

`state`:一个与指定网址相关的状态对象,popstate事件触发时，该对象会传入回调函数中，如果不需要这个值可以填写为null
`title`:新页面的标题，**但是所有浏览器目前都忽略这个值**，因此这个值可以写null
`url`:新的网址，必须与当前页同一个域。浏览器的地址栏将会显示这个url

## js多线程：woker

- **要求此任务不会对主线程有影响，主线程暂时用不到这个任务的数据**
- 没有window,所以this也不是window
- worker只是window的子集，只能实现部分功能，不能获取到window,document，所以不要引入jQuery等库

缺点：

1. 受同源策略限制
2. 受主线程DOM限制
3. 和主线程不在同一个上下文环境，不能直接通信，必须通过消息(postMessage)完成
4. 脚本限制，辅助线程不能执行alert confirm但可以使用xmlhttprequest发出ajax
5. 文件限制：无法读取本地文件，不能打开本机的文件系统，所加载的脚本必须来自网络

postMessage常用来子页面给父页面传递数据

example:

worker.js

```javascript
    this.onmessage=function(e){
        //执行的任务。。。
            //主线程的postMessage传的数据在e身上，如果要使用可以到e身上取
            // this.postMessage(向主线程汇报的数据)
        //辅助线程自己辞职：
         this.close();
    }
```

main.js(主线程):

```javascript
    var wk=new Woker("worker.js");//worker.js包含了需要交给woker的任务`
    wk.postMesage({数据});//向辅线程传数据
    wk.onmessage=function(e){
        //e身上有汇报的数据

        //辞退工人（辅助线程）,不再通信
        wk.terminate();
    }
```

## 文件读取 FileReader

在input[type="file"]上，可以监听input事件，当选择好文件时，可以在这个标签的files属性中获取到文件相关属性，下面的相关操作中的file，主要是使用这个files[0]属性

### 构建文件读取对象

`var read = new FileReader();`

### 不同的读取方式

`readAsBinaryString(file)`;将文件读取为二进制编码
`readAsDataURL(fie)`;将文件读取为DataURL
`readAsText(file,[encoding])`;将文件读取为为本
`readAsArrayBuffer(file)`;将文件读取为array buffer

`abort()`;中止读取

### 监听读取过程(事件)

- onloadstart    开始读取
- onprogress      读取中
- onloadend       读取结束，不论成败
- onload              读取成功
- onabort            读取中止
- onerror  读取错误
*在progress中有个属性值loaded表示已经加载的大小，total表示总共大小，可以用来做进度条*

### 文件分割方法 slice

**此方法非fileReader，而是file.**
`file.slice(起始字节，结束字节)`;

## WebSocket 即时通讯

websocket是一种网络协议，是在HTTP基础上做的改进，和HTTP无直接关系

webSocket诞生的原因:

```text
  HTTP协议有一个缺陷，数据请求只能由客户端发送，那么服务端数据更新了，想反馈给客户端是一个问题，以前的一个不好的解决方式是使用ajax轮询，定时向服务器请求数据，这样就浪费了太多的效率

  使用webSocket会建立一个长连接(不断开)，服务器数据会实时的向客户端发送数据。
  在HTTP协议中需要发送一个请求，经过tcp3次握手，拿到当前数据，tcp四次挥手断开，客户端得到数据，并且只能得到当时的数据，后续数据更改，需要重新主动发送请求才能获取最新数据
```

webSocket优点

- webSocket是建立在TCP协议之上的，服务端实现较为容易
- 与HTTP协议兼容性好，默认端口也是80/443，并且握手阶段采用HTTP，不容易被屏蔽，能通过各种HTTP代理服务器
- 数据格式轻量，性能开销小，通信效率高
- 可以发送文本和二进制数据
- 不受同源策略限制，可向任意服务器通信
- 标识符为ws(wss为加密)，服务器网址即为url

example:

``` javascript
    var  socket= new WebSocket("ws://echo.websocket.org");
        //请求建立echo.websocket.org的长连接

    socket.onopen=function(){//连接建立成功触发
    socket.send("hello");//向它发送数据

    }

    socket.onmessage=function(e){//接收服务端返回的数据
        console.log(e.data)
        socket.close();关闭长连接
    }

    socket.onerror=function(e){
    //错误时触发
    }
```

## geoLocation  获取地理位置

HTML5新增了获取用户地理位置的对象和方法。
**注意在苹果系统这些信息被视为个人隐私，需要在https协议下方能使用**

`window.navigator.geolocation`对象上拥有三个方法:
`getCurrentPosition(success回调，error回调,options参数);`
**获取当前位置，需要设备支持GPS，如果不支持则会去Google Map去查询你的位置，因此需要翻墙**

options配置(obj):

- enableHighAccuracy 是否需要高精度位置，默认false
- timeout    请求超时时间，单位ms,默认infinity
- maximunAge   watchPosition不停的获取和更新用户位置信息，设置位置信息过期事件，为0则无条件获取刷新位置，默认为0，单位ms
- 更多详细配置可去api查看

`watchPosition();`监听位置变化，参数和上面一致
`clearWatch();`清除位置监听

获取位置成功时，success回调函数会获得一个数据包-----position对象
position对象有一个时间戳和coords对象，这个coords对象包含了用户的地理位置信息:

- latitude:      纬度
- longitude:   经度	能够大于90度的
- altitude:      海拔
- accuracy:   定位精准度，单位m
- heading:     方向
- speed:        速度

example:

```javascript
    var loc = window.navigator.geolocation;
    loc.getCurrentPosition(success,error);
    loc.watchPosition(success,error);

    function success(e){
        var oDiv = document.querySelector('.local');
        var coords = e.coords;
        oDiv.innerText = `
            纬度：${coords.latitude}
            经度: ${coords.longitude}
            海拔：${coords.altitude}
            精准度: ${coords.accuracy}
            方向: ${coords.heading}
            速度：${coords.speed}
        `
    }

    function error(){
        console.log('地理位置信息获取失败!')
    }
```

## devicemotion 摇一摇

监听设备加速度变化 , 这是一个事件

```javascript
window.addEventListener("devicemotion",function(e){

});
```

在这个event对象上acceleration包含了3个轴的加速度情况
accelerationIncludingGravity包含了三个轴的重力加速度

## deviceorientation 指北针

监听设备在方向上的变化

e.layerX/e.layerY可以获取鼠标在当前元素的位置，需要被定位

## 陀螺仪/重力感应/体感

苹果设备需要在https协议下使用
陀螺仪是使用事件监听来获取的：

```javascript
window.ondevicerientation=function(event){

}
```

event包含了alpha,beta,gamma

- alpha:指北针，范围为[0,360),为0时指北，180指南
- beta:  设备在垂直方向的变化，设备平放为0，竖立为90（短边接触水平面）
- gamma:设备平放为0，设备倒放为90（长边接触水平面）
