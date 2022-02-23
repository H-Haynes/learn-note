# History模式配置

[toc]

## 场景

使用history模式部署到服务器，刷新页面出现404，需要配置项目和nginx

## Router配置

如果项目不是部署在根目录，需要设置`base`属性,值为`/你的目录名/`

比如，我服务器的server根目录是`/var/www`,而项目目录是`/var/www/netease`,那么base的值是`/netease/`;
==下面的配置均以此假设为例==

可使用参数进行本地和开发环境无缝切换:

`base:process.env.NODE_ENV == 'production' ? '/netease/' : '/',`

## Vue Config配置

配置publicPath，和上面一样

`publicPath:process.env.NODE_ENV =='production' ?  '/netease/':"/",`

## Nginx配置

增加location配置

```nginx
 location /netease {
  alias /var/www/netease/;
  try_files $uri $uri/ /netease/index.html;
 }
```

如此便可放心使用history模式了！
