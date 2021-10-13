import  dotenv from "dotenv"
import sequelize from "./db/orm.js"
import path from "path"
dotenv.config()
console.log(process.env.MYSQL_USERNAME,13)

try {
    sequelize.authenticate().then(()=>{
        console.log('数据库连接已完成');
    });
} catch (error) {
    console.error('数据库连接失败', error);
}


console.log("开始")
