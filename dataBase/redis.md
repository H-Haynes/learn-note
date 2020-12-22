# Redis

[toc]

## 简介

redis是一种nosql数据库,键值对类型，因此键是唯一的。
redis是一种开源的数据库，遵循BSD开源协议
redis值常用的类型：

- 字符串 Sting
- 哈希 HASH
- 列表 List
- 集合 Set
- 有序集合 Sorted sets

redis对数据的操作是在内存中进行的，因此拥有超高的读写效率，但是内存是有限的
redis会消耗大量内存，因此往往会搭建redis服务集群来解决内存不足

redis也有持久化，会异步的将数据存在磁盘，重启后，会从磁盘同步数据，
但是如果还没有存入磁盘的数据会丢失，这也是redis的特点

## Redis安装

### MAC/Linux

<一>
1.安装homebrew
2.执行`brew install redis-cli`
3.执行`redis-serve`
4.新开窗口执行`redis-cli`即可创建连接

<二>
1.`brew install redis` 安装
2.`brew services start redis`启动
3.`brew services stop redis`停止
4.`brew services restart redis` 重启

### Windows

1.github下载安装包安装即可<.msi文件>

## 基础命令

### 进入交互模式

1.无认证模式:`redis-cli -h <127.0.0.1> -p <6379>`

2.认证模式:

- 设置认证密码:
  - `config set requirepass 密码`
  - `auth 密码` 登录认证
  - 空串为清空密码
  - `config get requirepass` 查看密码

### 常用命令

- `keys <pattern>`获取匹配pattern的键值对，*为获取全部
- `exists <keys...>`查看key是否存在,返回存在数量
- `type <key>` 得到key的类型,不存在为none
- `dbsize` 得到key的数量
- `ttl <key>`得到key的过期时间，-1永不过期为默认值， -2为不存在，其他为时间，秒级别
- `expire <key> <time>` 设置key的过期时间：`expire name 20`
- `rename <oldkey> <newkey>`重命名key
- `del <key>`删除key

- `select <index>`选择一个数据库
- `flushdb` 删除当前数据库所有key
- `flushall`删除所有数据库的所有key

- `set <key> <value> [<TTL>] [<expireOption>]` 设置键值对
  - expireOption:
    - EX: 秒
    - PX:毫秒
    - NX:没有才设置
    - XX:有才设置
    - KEEPTTL:
- `get <key>`获取某个键值对
- `mget <keys...>`获取多个 key的值
- `incr <key>`将某个键的值自增
- `incrby <key> <number>`将某个键的值自增number个数

### list

- `rpush <key> <value>`向指定的key对应的链表尾部加一个值(l:left,r:right)
- `lpush <key> <value>`向指定的key对应的链表头部加一个值
- `llen <key>`得到链表长度
- `lrange <key> <start> <end>`得到链表指定的范围的值
- `lindex <key> <index>`返回链表key中下标为index的值
- `lset <key> <index> <value>` 设置链表key下标为index的值
- `lrem <key> <count> <value` 删除链表 key中值为value的项，删除count个
- `lpop <key>`删除链表的首元素
- `rpop <key>`删除链表的尾元素

### HASH

HASH相当于将redis的某个值设为对象

- `hset <key> <field> <value>`设置对象key的属性
- `hget <key> <field>`返回对象key的field属性值
- `hkeys <key>`  返回对象key的所有值
- `hvals <key>` 返回对象keu中所有的字段值
- `hgettall <key>`返回对象key中所有键值对
- `hexists <key> <field>`对象key中是否存在指定的字段
- `hdel <key> <field>`删除对象key中指定字段
- `hlen <key>`返回对象key中的字段数量
  