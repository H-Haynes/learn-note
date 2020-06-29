function take<T>(arr:T[],n:number):T[]{
    var newArr:T[] = [];
    if(n>arr.length-1){
        return arr
    }else if(n<=0){
        return []
    }else{
        for(var i=0;i<n;i++){
            newArr.push(arr.shift() as T)
        }
        return newArr
    }
    
}
console.log(take<string>(['h','e','l','l','o'],2))
console.log(take<number>([1,7,932,3],3))


// type callback<T> = (n:T,i:number)=>boolean;
// 接口类型
    interface callback<T>  {
        (n:T,i:number): boolean
    }


function filter<T>(arr:T[],callback:callback<T>):T[]{
    var newArr:T[] = [];
    arr.forEach((n,i)=>{
        if(callback(n,i)){
            newArr.push(n);
        }
    })

    return newArr;
}
console.log(filter<number>([1,3,45,43,5,6,8,22],(n,i)=>n%2==0))
console.log(filter<string>(['h','e','l','l','o'],(n,i)=>n=='l'))



class ArrayHelper<T> {
    constructor(private arr:T[]){}
    take(n:number):T[]{
        const newArr : T[] = [];
        if(n>this.arr.length){
            return this.arr
        }else if(n<=0){
            return []
        }else {
            for(var i=0;i<n;i++){
                newArr.push(this.arr.shift() as T)
            }
            return newArr
        }
    }
}

const myArr = new ArrayHelper([1,2,4,5]);
console.log(myArr.take(2))
const myArr1 = new ArrayHelper(['2','g','w']);
console.log(myArr1.take(1))

// 泛型约束
interface hasName{
    name:string
}
function upper<T extends hasName>(obj:T):T{ //该参数必须含有name属性
    obj.name =  obj.name.split(' ').map(ele=> ele[0].toUpperCase()+ele.substr(1)).join(' ');
    return obj
}
console.log(upper({
    name:"just do it"
}))

//多泛型
function mix<T,S>(arr1:T[],arr2:S[]):(T|S)[]{
    var arr :(T|S)[] = [];
    arr = arr1;
    arr2.forEach(ele=>arr.push(ele))
    return arr
}
console.log(mix([1,22,4],['a','b','c']))