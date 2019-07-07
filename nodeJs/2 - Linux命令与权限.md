# Linux命令与文件权限

[toc]

## Linux基础命令

* `reboot` 重启
* `cd`    切换目录
* `cd ..` 回到上一级目录
* `cd ~`  回到主目录
* `cd /`  回到根目录
* `ls`    查看文件目录并显示相关信息
* `ls -l`  即ll
* `ls -al` 查看文件目录包含隐藏文件(以.开头)
* `cat filename |grep "cont"` 管道过滤，在指定文件中查找包含指定的内容( cat为查找命令，grep为过滤命令filename为文件名,cont为查找内容)
* `cat filename |grep "cont1" |grep "cont2"` 再次过滤
* `ll |grep "node"`   仅显示含有node的文件信息
* `mkdir` 创建文件夹,后面跟文件夹名
* `touch` 创建文件，后面跟文件名
* `mkdir -p test1/test2`  创建test2文件夹，如果没有test1文件夹，则也创建test1文件夹
* `rmdir` 删除文件夹，后跟文件夹名,仅能删除空文件夹
* `rm -rf` 递归的删除文件夹，后跟文件夹名
* `mkdir -m` 创建带权限的文件夹，后跟文件夹名
* `mkdir -m 777` 创建公有读写执行权限的文件夹
* `pwd` 显示当前文件夹的绝对路径
* `vi`  后跟文件名，创建文件并使用vim打开，如果不保存则文件不会被创建
* `chmod 777 filename` 给指定文件添加777权限（权限请查看 Linux命令与权限.md）
* `lscpu` 查看cpu信息
* `df`查看磁盘信息
* `df -i` 查看磁盘信息(索引)
* `ps aux` 查看目前系统运行的服务
* `top` 资源占用情况
  * 其中的load average为1，3，15分钟的占用情况
  * Cpu(s)的参数分别为:
    * us用户的cpu占用比,
    * sy系统的cpu占用比,
    * ni改变过优先级的进程cup占比，
    * id空闲cup百分比,
    * wa为i/o等待的占用百分比，
    * hi硬件中断cup占比,
    * si软件终端cpu占比,
    * st实时cup占比
* `systemctl disable firewalld` 关闭防火墙( 需reboot才有效)
  
## 用户命令

tip:**用户必须至少属于某一个组**

* `useradd name`  创建新用户, name为用户名
* `cat /ect/passwd` 查看用户列表及信息,[用户名:密码(x为未知):用户ID(自己定义的用户ID从1000开始):用户所在组id:备注:用户目录]
* `passwd username` 添加用户密码,username为用户名，完成后会让填写密码
* `ssh ip`  远程连接用户,ip为用户ip地址(ip addr查看)
* `cat /etc/group`  查看用户组
* `groupadd groupname`添加用户组，groupname为用户组名
* `useradd -G groupname username` 新增用户至指定用户组
* `groupdel groupname` 删除用户组,不可删除有用户(且该组为这个用户唯一的组)的组
* `userdel username` 删除用户
* `groups usernamw` 查看用户所在组
* `whoami`  查看自己所在用户组
* `su username` 切换用户,切换为管理用户请加上sudo
* `exit` 返回用户

## vim命令

vi打开文件后

* [i] 进入insert模式，可以编辑文件  
* [h] [j] [k] [l] 光标移动，上线左右  
* [2h]  光标向指定方向移动指定个位置  
* [+] 光标移动移动至下一个非空格行  
* [ctrl+f] 向翻页  
* [ctrl+b] 向上翻页  
* [ctrl+d] 向下翻半页  
* [esc] 退出insert模式  
* [$] 跳转至行尾  
* [^] 跳转至行首  
* [shift+g] 跳转至最后一页  
* [5+shift+g] 跳转至第5行  
* [gg]    跳转至第一行  
* [/] 查找最近的符合条件的内容,后面跟查找内容,向下查找
* [?]向上查找  

* `:w`  保存
* `:wq` 退出并保存
* `:w!` 强制退出并保存
* `:q!` 强制退出

## 文件权限

 第一个字符：文件夹or文件[文件为 -，文件夹为d]
 后面分三组:

* 当前所属用户权限
* 当前所属组的权限
* 其他用户权限
这三组按RWX来写，不拥有此权限则为-  

  R权限读   W权限写     X权限执行  

 R代表数字4  
 W代表数字2  
 X代表数字1  
如果想设置权限，可以使用他们的和来设置，如读写为6，写执行为3,只读4
