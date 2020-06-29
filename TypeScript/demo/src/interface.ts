interface User {
    name:string,
    age:number,
    reply:() => void,
    favorite():void
}

let me:User ={
    name:'星河',
    age:25,
    reply:()=>{
        console.log(`我叫星河,我今年25岁`)
    },
    favorite(){
        console.log("我打酱油")
    }
}
me.reply()

// 类型别名约束函数
type Condition =(n:number)=>boolean
function sum (numbers:number[],callback:Condition):number{
    let result = 0;
    numbers.forEach(ele=>{
        if(callback(ele)){
            result += ele 
        }
    })
    return result
}
//功能为按要求完成指定数组的某些数值相加
console.log(sum([1,2,3,4,5,6,7,8,9], n => n%2==0),'偶数位之和');
console.log(sum([1,44,63,67,78,99,107,128,149], n => n*5%10==0),'5倍后尾数为0的数之和');

interface  A{
    T1:number
}
interface B extends A{
    T2:string
}
let ext:B = {
    T1:24,
    T2:"继承"
}
interface C extends A,B{    //多重继承
    T3:Boolean
}
let ext2:C = {
    T1:66,
    T2:'多重继承',
    T3:true
}

interface listen{
    lesson:number,
   readonly name:string
}
let learn:listen={
    lesson:1,
    name:"ts"
}

var a = 2;
for (var i = 0; i < 23; i++) {

    a = a++;
    console.log(a,'后')
}
console.log(a)
