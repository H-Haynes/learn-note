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

