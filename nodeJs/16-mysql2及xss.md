# mysql驱动程序 及 sequelize

## 什么是驱动程序？

驱动程序时连接内存和其他介质的桥梁
mysql驱动是连接内存数据和mysql数据的桥梁
mysql驱动程序常用：mysql、mysql2

## mysql2

回调式

```javascript

    import mysql from "mysql2"

    const connection = mysql.createConnection({
        port:"",
        host:"",
        user:"",
        password:"",
        database:""
    })

    connection.query("select * form user",(err,res)=>{

    })
```

promise式

```javascript
    import mysql from "mysql2/promise"
    const connection = async ()=> {
        await mysql.createConnection({
            port:"",
            host:"",
            user:"",
            password:"",
            database:""
        })
    }

    connection.query("select * from user").then(res=>{

    })
```

## 防sql注入攻击

不要使用字符串拼接，模板字符串来写sql语句，而使用变量
不使用query函数，而使用execute

```javascript
let sql = 'select * from user where id =?'
let result = await connection.execute(sql,[5])
connection.end()
```

如果使用模糊查询的，查询的变量不可使用?，要使用concat
`select * from user where name like '%?%'` //worng
`select * from user where name like concat('%',?,'%')`

## 连接池 connection pools

使用连接池可以防止过量的连接，造成服务器卡顿，超过连接池限制数量的，进入队列等待
连接池无需end,会自动关闭

```javascript
    import mysql from "mysql2/promise"

    const pool = mysql.createPool({
        host,
        user,
        database,
        waitForConnection:true,//连接已满是否等待
        connectionLimit:10,
        queueLimit:0    //排队的队列最多能排多少，0表示无限
    })

    pool.execute(sql)
```
