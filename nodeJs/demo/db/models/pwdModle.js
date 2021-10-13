import { Sequelize,DataTypes } from "sequelize/types";

const sequelize = new Sequelize("pwd",{
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true,
})

export default sequelize