# ORM

## 什么是ORM

ORM, Object Relational Map 对象关系映射
通过ORM框架可以自动把程序中的对象和数据库关联
ORM框架会隐藏具体的数据库底层细节，让开发者使用同样的数据操作接口，完成对不同数据库的开发

## 优势

1. 开发者无需关系数据库，只关心对象
2. 可轻易完成数据库移植
3. 无需拼接复杂的sql语句即可完成精确查询

## node中的ORM

### Sequelize

较为成熟，支持JS和TS，对TS支持度不如TypeORM

#### 模型定义和同步

先要使用npm安装sequelize,并安装要使用的数据库驱动程序

```javascript
  import {Sequelize} from "sequelize"
  const sequelize = new Sequelize("数据库名","账号"，"密码"，{
      host:"",
      dialect:"数据库类型"
  })

  sequelize.authenticate().then(res=>{//测试连接
    console.log("连接成功")
  },err=>{
      console.error("连接失败！“)
  });
```

sequelize将保持连接一段时间，如果没有新的操作，会自动关闭连接，因此无需手动执行关闭，如果需要手动，可以使用`sequelize.close()`进行关闭

**定义模型**

```javascript
    sequelize.define("表名称",{
        username:{
            type:DataTypes.STRING, //数据类型
            allowNull:false //是否允许null
        }
    },{
        //其他参数,
        
        freezeTableName:true,//禁止自动化表名称
        tableName:"自定义表名称"

    })
```

默认会将表名称自动加复数作为数据表的真实名字，如果不想使用自动生成的名字，可以在第三个参数中配置`tableName:表名称`,

**同步**

```javascript
//同步单个模型
模型.async({ // 不穿参数则：表不存在创建该表，村子则不执行任何操作
    force:true,//创建表，若存在则先删除
    alter:true, // 先检查表状态，进行必要变更，使其符合模型(不匹配的删掉)
    createdAT:false,    //不自动生成该字段
    updatedAt:false,//不自动生成该字段
    paranoid:true,  //不真正删除该数据，而是设置deletedAt字段
    deleteAt:"设置删除时间字段名字",
})

sequelize.sync({}) // 同步所有模型
```

**日志记录**

sequelize默认会将每个执行的sql记录在控制台，可通过配置修改一些内容

```javascript
    new Sequelize("数据库类型",{
        logging:console.log // 显示日志函数调用的第一个参数
        logging:(...msg)=>console.log(msg) // 显示所有日志函数调用参数
        logging:false,      //金庸日记记录
        logging:msg => logger.debug(msg) // 使用自定义记录器,显示第一个参数
        logging:logger.debug,bind(logger)// shying自定义记录器的另一种方法，显示所有消息
    })

```

**关联**

A.hasOne(B,{})
A.belongsTo(B,{})
A.hasMany(b,{})
A.belongsToMany(B,{through:'C'}) // c外键关系表

**CRUD**

```javascript
    const obj = User.build({name:"名字"}) //构建模型实例,同步方法
    obj.save() // 存入数据库
    User.create(数据); //build + save 异步方法

    const user = await User.findByPk(primaryKey) //根据主键查询数据
    await user.destroy() //删除实例(update deletedAt)

    User.destroy(({  //条件删除
        where:{
            id:1
        }
    }))

    user.id = 1;
    user.save() //根据实例修改数据

    User.update({name:"家具送家具设计师家具时"},{
        where:{
            id:1
        }
    }) // 直接修改，返回数组，受影响的行数

    User.findOne(条件)//查询1条数据,返回模型实例
    User.findByPk(pk)//根据主键查数据
    User.findAll(条件) //查询所有
    User.findAll({ //分页查询
        offset:(page-1) * 6
        limit:6
    })

    
```

### 数据爬虫

axios

cheerio


### TypeORM

只支持Typescript，较新不太成熟
