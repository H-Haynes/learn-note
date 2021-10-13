import {DataTypes} from "sequelize"
import sequelize from "../orm"
import passwordModel from "./pwdModle"
const User = sequelize.define({
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mail:{
        type:DataTypes.STRING,
        allowNull:true
    }

},{
    sequelize:
})