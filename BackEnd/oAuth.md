# oAuth

[toc]

## 授权流程

1. `frontEnd`:向第三方发起授权请求
2. `third`:用户同意授权后，携带授权码返回给第三方应用的后端
3. `backEnd`:用户携带授权码(`code`)向第三方请求令牌(`access_token`)
4. `third`:第三方校验通过后，返回令牌至前端
5. `frontEnd`:请求令头携带`token`实现信息获取

## 令牌特点

1. 短期的，到期自动失效，用户无法修改。
2. 可以背数据所有者撤销，令牌立即失效
3. 有权限范围(scope),对于网络服务来说，只读令牌比读写令牌更安全

## 获取令牌的4中方式

无论哪种方式，申请之前需到第三方进行备案，然后会拿到两个身份识别码：client ID & client Secret，未备案无法获取第三方授权

### 授权码

第三方先申请授权码,然后用该授权码获取令牌。
授权码由前端传送，后端存储，通信皆由后端完成，能避免令牌泄漏
**适合前后端分离，最常用**

1. A站提供一个链接，用户点击后会跳转至B站，授权用户数据给A站使用

```javascript
    response_type=code&client_id=CLIENT_ID&redirect_url=REDIRECT_URL&scope=read
```

2.跳转成功后，B站会要求用户登陆，然后询问是否确认授权，用户同意后，会跳回`redirect_url`设置的网址，并携带一个授权码

3.后端拿到该授权码，向B站请求令牌

```javascript
    client_id=CLIENT_ID&
    client_secret=CLIENT_SECRET&
    grant_type=authorization_code& //授权方式
    code=AUTHORIZATION_CODE&    //授权码
    redirect_url=CALLBACK_URL   // 回调地址
```

4.B站收到请求后，即会颁发令牌，会向回调地址发送一段JSON，包含用户信息之类的东西

```json
    {
        "access_token":"xxx", //token
        "token_type":"bearer", // token 类型
        "expire_in":3600,   // 有效期
        "refresh_token":"xxx",  //下次获取token无需再进行授权操作，使用该token到对应地址直接换取新的token
        "scope":"read", // token权限
        "uid":12993,    // 其他信息
        "info:{},    // 信息
    }
```

### 隐藏式

适用于纯前端web应用，必需将token存放于前端，允许直接向前端发送令牌，无授权码步骤,所以叫隐藏(授权码)式
安全性较低，适用于信任较高的网站，令牌有效期更短，一般是关闭页面即失效(sessionStorage)

1. A站跳转到B站，用户授权给A站使用

    ```javascript
    response_type=token&
    client_id=CLIENT_ID&
    redirect_url=REDIRECT_URL&
    scope=read
    //response_type=token表示直接返回token
    ```

2. 用户同意后B站跳转至`redirect_url`，把令牌由url传回A站(token是以hash位置传回[防中间人攻击，hash不会被http协议携带，减少泄漏风险]，而不是queryString)

### 密码式

要求绝对信任，RFC 6478也允许用户把用户名/密码直接告诉应用，该应用就使用你的密码申请令牌，所以叫密码式

1. A站要求用户提供B站的用户名及密码，拿到后A站直接向B站请求令牌

    ```javascript
    grant_type=password&
    username=USERNAME&
    password=PASSWORD&
    client_id=CLIENT_ID
    ```

2. B站验证用户密码后，直接给出令牌，无需跳转，直接把token放在json中作为http回应

### 客户端凭证

适用于无前端的命令行应用

1. A向B发起请求

    ```javascript
    grant_type=client_credentials&
    client_id=CLIENT_ID&
    client_secret=CLIENT_SECRET
    ```

2. B验证后直接返回token(无前端不易泄漏，没有那么多弯弯绕绕)

## 令牌使用

在http请求头(request-header)中设置一个`Authorization`字段，值为token.第三方会校验该字段

## 令牌更新

oAuth2.0允许用户自动更新令牌:

1. B站向A站一次颁发两个令牌,一个用于获取数据(access_token)，一个用于更新令牌(refresh_token)

2. 令牌到期前，用户使用refresh_token发送一个请求至第三方，进行令牌更新

    ```javascript
    grant_type=refresh_token&
    client_id=CLIENT_ID&
    client_secret=CLIENT_SECRET&
    refresh_token=REFRESH_TOKEN
    ```

3. B站验证通过后，返回新的令牌

