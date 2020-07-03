// //问题的产生
// class People {
//     @require
//     @Range(3,5)
//     @description('账号') 
//     loginId:string; //3-5个字符,注意该注释信息无法告知系统,必填
//     loginPwd:string;    //6-12个字符
//     age:number; //0-120之间的数字
//     gender:"男"|"女";

//     constructor(id:string,pwd:string,age:number,gender:'男'|'女'){
//         this.loginId = id;
//         this.loginPwd = pwd;
//         this.age = age;
//         this.gender = gender
//     }

//     validate(){
//         //问题:我们明明清除它的取值范围，却还要来进行判断，并且是大量的重复代码
//         if(this.loginId.length>=3 && this.loginId.length<=5){

//         }
//         if(this.age>=0 && this.age <=120){

//         }
//     }
// }

//类装饰器
function classDecorator(target:new ()=>object){
    console.log(target)
}

@classDecorator
class TestClass {
    
}