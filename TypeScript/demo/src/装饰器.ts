import "reflect-metadata"
import "class-validator"
import { IsNotEmpty, Length, validate, MinLength, MaxLength } from "class-validator"
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
function classDecorator(target:new (...args:any[])=>object){
    return class B extends target{

    }
}

// function range(target:any,min:number,max:number):string{
//     if(value.length>=min  && value.length <=max){
//         throw new Error('取值范围异常')
//     }else{
//         return value
//     }
// }

//如果想传参，可以做成返回一个函数的形式
function test(str:string){
    return function (target:new (...agrs:any[])=>object){

    }
}

// function range(min:number,max:number){
//     return function (target:any,key:string){
//         if(target[key].length>min || target[key].length<min){
//             throw new Error(`${key}的取值不符合规范[${min},${max}]`)
//         }else{

//             console.log
//         }

//     }
// }


// @classDecorator
//@test("带参")
class TestClass {
    // @range(6,12)
    name:string
    constructor(name:string){
        this.name = name
    }
}

function enumerable(target:any,key:string,descriptor:PropertyDescriptor){
    descriptor.enumerable = true
}
function useless(target:any,key:string,descriptor:PropertyDescriptor){
    descriptor.value = function ():void{
        console.warn("该方法即将废弃!")
    }
}

class Descriptor{
    @enumerable
    @useless
    method1(){
        console.log("正常状态")
    }
}

console.log(new Descriptor().method1())
for(var prop in new Descriptor()){
    console.log(prop)
}

// var x = new TestClass("我是星河");


//装饰器练习  
@classDescriptor('用户')
class User{
    @propDescriptor("账号")
    loginId:string

    @propDescriptor("密码")
    loginPwd:string

    constructor(loginId:string,loginPwd:string){
        this.loginId = loginId
        this.loginPwd = loginPwd
    }
}

//类描述装饰器工厂
function classDescriptor(desc:string){
    return function (target:Function){
        target.prototype.$classDescription = desc;
    }
}

//属性描述装饰器工厂
function propDescriptor(desc:string){
    return function (target:any,propName:string){
        //将描述作为数组放到原型
        if(target.$propDescriptions){
            target.$propDescriptions.push({
                propName,
                desc
            })
        }else{
            target.$propDescriptions = []
        }


        
    }
}
var user =new User("星河","1234567")

function printObj(obj:any){
    if(obj.$classDescription){
        console.log("类描述:",obj.$classDescription);
    }else{
        console.log("类描述:",obj.prototype.constructor.name)
    }

    if(!obj.$propDescriptions){
        obj.$propDescriptions = []
    }

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const prop = obj.$propDescriptions.find((ele:any)=>ele.propName === key);
            if(prop){
                console.log(`\t${prop.desc}:${obj[key]}`)
            }else{
                console.log(`\t${key}:${obj[key]}`)
            }
            
        }
    }

    console.log("属性描述",obj.$propDescriptions);
}
printObj(user)







const key ="descriptor"
function printObj1(obj:any){
    const cons = Object.getPrototypeOf(obj);
    if(Reflect.hasMetadata(key,cons)){
        console.log("类描述:",Reflect.getMetadata(key,cons));
    }else{
        console.log("类描述:",cons.constructor.name)
    }

   

    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if(Reflect.hasMetadata(key,cons,prop)){
                console.log(`\t${Reflect.getMetadata(key,cons,prop)}:${obj[prop]}`)
            }else{
                console.log(`\t${prop}:${obj[prop]}`)
            }
            
        }
    }
}


function descriptor(descript:string){
    return Reflect.metadata("descriptor",descript)
}
class Article{
    @descriptor('书名')
    @IsNotEmpty({message:'书名不可为空'})
    @Length(3,6)
    book:string

    @descriptor("作者")
    @MinLength(2,{message:"名称不少于2字符"})
    @MaxLength(12,{message:"名称最长不超过12个字符"})
    author:string
    constructor(book:string,author:string){
        this.book = book;
        this.author = author
    }
}

var article = new Article("C++程序设计",'谭浩强');
printObj1(article)
validate(article).then(errors=>{
    console.log(errors)
});

