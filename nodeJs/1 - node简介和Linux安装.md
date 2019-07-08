# NodeJS的简介和安装

[toc]

## NodeJS简介

### 计算机语言编译过程

* **词法分析**
  识别关键字，标识符，分解符，运算符
  如果两种语言拥有相同的词法分析，不代表他们是同一种语言
* **语法分析**
  将代码转化为命令与句或短语
  如果两种语言拥有相同的语法分析，也不代表他们是同一种语言
  `如果认为两种语言的词法分析和语法分析相同就是同一种语言的话，那么javascript和nodejs就可以看做是同一种语言`
* **语义分析**
  生成计算机操作系统能够执行的程序
  `JS和NodeJS的语义分析不同`
  
### NodeJS是否是单线程的

不是，NodeJS是多线程的，只是被封装在底层，让人感觉是单线程的

### NodeJS特点

* 异步I/O
* 高性能
* 事件驱动

NodeJS是一门后端语言，它需要运行在Linux系统下

### Linux主流分类

* Ubantu
  * 界面华丽，完善的管理系统和软件支持，分用户端和服务端
* CentOS
  * 较多公司在生产环境部署CentOS，优点较多，开源免费，社区活跃
* Debian
  * 内核极小，非常稳定，适用于系统硬盘空间小，内存小的设备
* RedHat
  * 基于Linux，遵守GPL规则，代码开源，商用付费，CentOS就是从其分出来的免费的版本

## Node安装

### 安装虚拟机

  VM Ware 或 VirtualBox
  下载CentOS镜像，在虚拟机中创建Linux，没有CentOS选项则选择other-bit,如果没有64位选项，则需要开启CPU虚拟化(百度操作)

  安装完成在设置存储中将镜像导入完成安装即可
  使用ip addr命令查看ip,ping发现没有网络
  需要跳转到`cd /etc/sysconfig/network-scripts` 目录,
  使用命令 `vi ifcfg-enp0s3`打开文件
  使用i进入编辑模式，==将最后一行的ONBOOT的值改为yes==
  按esc退出编辑模式，输入`:wq`(退出并保存)
  然后重启虚拟机即可

  下载安装工具wget: `yum install wget`

### 安装Node

  安装node：在网上查找到node的安装url，使用命令wget url来安装它，如  
    `wget <https://nodejs.org/dist/v10.16.0/node-v10.16.0-linux-x64.tar.xz>`  
  **查看当前目录命令**  
    ll或者ls，后者只显示文件名，且横向排列,前者显示文件详细信息并纵向排列,查看到node包名称,它有两层包，需要两次解压  
  1.使用解压命令解压刚才下载的node包,`xz -d node包名字`  
  2.使用解压命令:`tar -xf 上次解压完的名字`  
    解压完成就能使用ls查看到解压完成的文件夹（蓝色的）  
    进入这个文件夹，将node程序连接到应用目录(node程序位于解压完的文件夹的bin目录)：  
    `ln -s ~/解压完的文件夹/bin/node  /usr/bin/node`  
    `ln -s ~/解压完的文件夹/bin/npm   /usr/bin/npm`  
    `ln -s ~/解压完的文件夹/bin/npx   /usr/bin/npx`  
    这样就能使用node,npm,npx命令了  
    *不必手打文件夹名，输入前面的字符按tab能自动补全*  

### 根目录路径

Linux的文件目录遵循FHS协议（FileSystem Hierarchy Standard），即所有用户的目录都一致，这样大家即使在不同的电脑也能很快找到资源位置

* **/usr (UNIX Software Resource)**
    和软件的安装有关，安装的软件都在这个目录
* **/var (Variable)**
    和系统运行相关
* **/bin**  是链接至/usr/bin目录的，可执行的文件
* **/boot** 和系统开机相关
* **/dev**
* **/etc**  存放配置文件的
* **/home** 普通用户目录
* **/root** 管理员用户
* **~**   当前用户的根目录,如创建新用户，它的~就在 `/home/新用户名` 这个目录里面
* **/lib**  Linux的函数库，驱动等
* **/media**  媒体库,U盘，光盘等可删除设备
* **/mnt**  和media类似
* **/opt** 存放第三方软件目录
* **/sbin** 比bin多一个super,仅管理员权限能执行
* **/srv**  存放用户主动生成的数据
* **/tmp**  临时文件
* **/proc**  存放系统内核，进程，网络等
* **/sys**   存放系统和内核相关信息
* **lost** **found** 文件系统发生错误时，文件碎片存放在此区域

tips:文件权限请查看《Linux命令与权限》
