# 一些不常见的BUG 的解决方法

[toc]

## 元素文字过多时字体变大，且设置的字体大小未失效，但是不起作用,且大部分设备正常显示，少部分设备会出现此问题

解决方案:给元素设置```max-height:9999px```即可解决，出现这种问题的原因未知！部分说设置```inline-block```也可，但尝试后并未解决

## 连接数据库出现Access denied for user 'root'@'xxx.xxx.xxx.xxx' (using password: YES) 问题

1.如果错误是1045(28000),那么问题可能是密码错误了,网络上有一堆的重置密码方案
2.如果是没有28000，那么可能是没有开启远程授权
***如果是使用dataGrip，那么提示可能是08001，并且不会给出详细的错误原因***

### 远程授权

1.在服务端使用```mysql -u root -p```命令登录数据库
2.使用命令```grant all privileges on *.* to '用户名'@'%' identified by '登录密码' with grant option;```设置远程登录用户;
3.使用命令```flush privileges;```刷新权限，然后就能够连接到数据库了
