import {Sequelize } from "sequelize"

console.log(process.env.MYSQL_USERNAME,12)
const sequelize = new Sequelize(process.env.MYSQL_BD,process.env.MYSQL_USERNAME,process.env.MYSQL_PWD,{
    host:process.env.MYSQL_HOST,
    dialect:"mysql"
})


export default sequelize