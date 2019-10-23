# mongoDB数据库的使用

[toc]

## windows下的mongoDB安装步骤 

1. 前往<a href="https://www.runoob.com/mongodb/mongodb-window-install.html">下载网站</a>
2. 对于版本选择上，不应该选择最新的，而应该选择最稳定的
3. 安装包的格式有zip和msi两种，建议选择msi，更符合微软安装和卸载协议
4. 小白式安装，在安装目录的bin目录下运行mongodb.exe
5. 验证是否安装：输入db，如果有反应则表示ok

## centOS下的mongodb安装

1. 执行安装命令：``wget http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-2.4.9.tgz``
2. 解压缩安装包: `tar zxvf mongodb-linux-x86_64-2.4.9.tgz`
3. 移动 `mv ./mongodb-linux-x86_64-2.4.9  /usr/local/mongodb`
4. 我们常把数据存放在home文件夹下，因此，在home目录下创建一个文件夹 `mkdir -p  /home/mongodb/`
5. 创建日志路径: `mdir -p /home/mongolog/`
    `cd /home/mongolog`
    `vi mongodb.log`
    保存并退出
6. 启动mongodb:
   `cd /usr/local/mongodb`
   `./bin/mongod --dbpath /home/mongdb/ --logpath /home/mongolog/mongodb.log --fork --port 27017`
   默认端口是27017

## 基础指令

先到安装目录,使用 `./mongo`

* 显示所有数据库 `show dbs;`
* 使用数据库 `use 数据库名`
* 查看当前数据库名   `db.getName();`
* 显示集合    `show collections`
* 创建集合  `db.createCollection('集合名字')`

### 增

`db.集合名字.save({字段名1：字段值1,字段名2：字段值2});`
### 查

* 查找所有  `db.集合名.find();`
* 精确条件查询: `db.集合名.find({限定名:限定值})`
* 模糊条件查询(示例): `db.集合名.find({age:$gt:18})`,查询age大于20的;
  * $lt小于，$gte大于等于,$lte小于等于
* 字段去重 `db.集合名.destinc('字段名')`,返回不重名的所有字段
* 多条件查询:
  * **且**  `db.集合名.find($and:[{字段名1:字段值范围, 字段名2:字段值范围}])`
  * **或**  $or
  * **之间**   `db.集合名.find({限定字段名:{限定1，限定2}})`
     示例:
    `db.test.find({age:{$gt:25,$lt:18}})`
* 限定条数 `db.集合名.find().limit(限定条数)`
* 跳过条数  `db.集合名.find().skip(跳过条数)`
* 查询总条数 `db.集合名.count();`

### 删

`db.集合名.remove({条件})`

### 改

`db.集合名.update(修改谁,$set:修改他的什么属性,false,true);`
false是指（是否使用找不到就新增的策略），true是否全部修改，如果要全部修改，必须将前一个参数(false)带上
示例:
`db.test.update({name:'满船清梦压星河',$set:{sex:'superman'}},false,true)`

