# 开启gzip功能

## 检查gzip_static

查看是否已安装gzip_static:

进入nginx**运行程序**目录，执行`./nginx -V`，根据输出查看是否带有`--with-http_gzip_static_module`，有则可以忽略安装步骤
没有的则复制这些参数（后面使用）

## 安装gzip_static

要求必须时源码安装的nginx(使用编译命令安装<`make`,`makefile`>的), 安装包的无法添加模块

1. 进入源码目录，执行`./configure 刚才复制的参数 --with-http_gzip_static_module`
2. `make`, 千万不要install,会覆盖原nginx
3. 上面执行完毕后，在objs子目录,有一个新的nginx运行程序，将它移动到原nginx运行程序位置替换掉, `cp objc/nginx 原nginx程序目录`
4. 配置`nginx.conf` ,该文件在nginx程序目录下的conf目录, （非运行程序）

```conf
    //nginx.conf
    #开启和关闭gzip模式
    gzip on;

    #gizp压缩起点，文件大于1k才进行压缩
    gzip_min_length 1024k;
    #gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
    gzip_comp_level 4;

    #进行压缩的文件类型。
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;

    #nginx对于静态文件的处理模块，开启后会寻找以.gz结尾的文件，直接返回，不会占用cpu进行压缩，如果找不到则不进行压缩
    gzip_static on;

    #是否在http header中添加Vary: Accept-Encoding，建议开启
    gzip_vary on;

    #设置压缩所需要的缓冲区大小，以4k为单位，如果文件为7k则申请2*4k的缓冲区 
    gzip_buffers 4 16k;

    #设置gzip压缩针对的HTTP协议版本
    gzip_http_version 1.1;
```

5. 重启nginx`service nginx restart`,服务器就能使用gzip了，畅想享加速度!
