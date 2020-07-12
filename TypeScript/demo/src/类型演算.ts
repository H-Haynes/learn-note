//typeof
class C{
    name:string="我的名字"
    age:number=23
}

// function creatorC(cons:C):C{ 参数错误
function creatorC(cons:typeof C):C{
    //或使用 cons:new ()=>C
    return new C()
}

 console.log(creatorC(C));    //参数错误，


// keyof

//function printProp(obj:C,prop:string){  //错误，无法确定prop一定是name或者age
//function printProp(obj:C,prop:'name'|'age'){    //prop类型应该是其拥有属性中的一个
function printProp(obj:C,prop:keyof C){
    console.log(obj[prop])
}

printProp(creatorC(C),'name');


//in

interface D{
    name:string
    age:number
    sex:string
}
type Obj = {
    //[p:string]:string;  //会导致可添加任意属性
    // [p in "name"|"sex"]:string 
    // [p in keyof D]:string       //获取D类型所有成员，并都改为string类型
    // [p in keyof D]:D[p] //不改变原类型
    //readonly [p in keyof D]:D[p]    //只读
    [p in keyof D]?:D[p]    //属性可选
}

var f:Obj = {
    name:"星河",

    age:22
};
//f.cnm = "cnm";  //错误，添加不上
//f.qnmlgb ="qnmlgb"
f.name="你好"
console.log(f)


