# Nginx

[toc]

## rtmp模块下载

rtmp模块需要使用配置，不能使用直接安装的nginx

1. `cd /usr/local`
2. 下载rtmp模块: `wget  https://github.com/arut/nginx-rtmp-module/archive/master.zip`
3. 解压备用 `unzip master.zip`

## 安装nginx及使用rtmp

1. 下载官方压缩包到 /usr/local目录 `wget http://nginx.org/download/nginx-1.14.2.tar.gz`不要追求高版本
2. 解压 `tar -zxvf nginx.tar.gz`
3. 安装PREC模块 `yum -y install pcre-devel`
4. 安装openSSL模块  `yum -y install openssl openssl-devel`
5. `cd nginx`
6. 配置模块 `./configure --add-module=/usr/local/nginx-rtmp-module-master --prefix=/usr/local/src/nginx  --with-http_ssl_module`,其中prefix是指生成的nginx所在位置
7. 编译:`make && make install`
8. 编译过程若出现`ngx_murmur_hash2`错误是将警告当成了错误处理，修改nginx目录下objs/Makefile文件中第二行中的'-Werror',`vi objs/Makefile`
经测试centos 7.9以上会出下列错误
9. 若出现错误:==‘struct crypt_data’没有名为‘current_salt’的成员==,注释掉出现错误的那一行,`vi src/os/unix/ngx_user.c`,注释第36行
10. 若出现 `implicit declaration of function ‘EVP_MD_CTX_cleanup'`表示openSSL和 nginx版本不匹配，nginx降下级就好了

11. 若出现 `ngx_rtmp_eval.c: In function ‘ngx_rtmp_eval’:`则在rtmp包的该文件第169行空行加入`/* fall through */`,vi/vim可使用`:set number`显示行号

## 将nginx加入系统服务service

1.`cd  /usr/lib/systemd/system`
2. vi nginx.service
3. 将以下代码复制到该文件，保存

    [Unit]
    Description=The nginx HTTP and reverse proxy server
    After=network.target remote-fs.target nss-lookup.target

    [Service]
    Type=forking
    PIDFile=/usr/local/src/nginx/logs/nginx.pid
    ExecStartPre=/usr/bin/rm -f /usr/local/src/nginx/logs/nginx.pid
    ExecStartPre=/usr/local/src/nginx/sbin/nginx -t
    ExecStart=/usr/local/src/nginx/sbin/nginx
    ExecReload=/bin/kill -s HUP $MAINPID
    KillMode=process
    KillSignal=SIGQUIT
    TimeoutStopSec=5
    PrivateTmp=true

    [Install]
    WantedBy=multi-user.target

4.重载系统服务配置 `systemctl daemon-reload`
5.设置开机自启 `systemctl enable nginx.service`

可以使用systemctl和service来控制nginx了

## 配置rtmp

在nginx.conf文件中加入以下配置:
1.新增rtmp配置，注意，不属于任何server,和http平级

    rtmp {
        server {
            listen 1935;  #服务端口--默认
            chunk_size 4096;   #数据传输块的大小--默认
            #设置直播的application名称是 live
            application live{
                live on; #live on表示开启直播模式
            }
            #设置推流的应用名称
            application push{
                live on; #开启直播
                push rtmp://183.126.90.80/live; #推流到上面的直播应用
            }
        }
    }

2.在http server中加入:

     location /stat {
        # 直播服务监控,访问该路由可查看流媒体状态
        rtmp_stat all;
        rtmp_stat_stylesheet stat.xsl;
     }

     location /stat.xsl {
        #注意这里的路径不能错误，直接写绝对路径就可以
        root  /usr/local/nginx-rtmp-module-master;
        # 为流媒体文件夹路径
    }

重启后即可访问推流拉流地址


