class User {
    private life = 88
    readonly id:number
    name :string
    age : number
    gender:'男'|'女' = '男' //默认值
    idCard:string | undefined  //可选参
    constructor(name:string,age:number){
        this.name = name
        this.id=Math.random()
        this.age = age
    }

    showYourLife():void{
        console.log(`你还有${this.life - this.age}年寿命`)
    }
}

let user = new User('星河',24)
user.gender = '女'

user.showYourLife()

class Admin{
    private _auth:number = 777
    set auth(value:number){
        if(value<111){
            this._auth = 111
        }else if(value >777){
            this._auth = 777
        }else {
            this._auth = value
        }
    }
    get auth(){
        return Math.floor(this._auth)
    }
}

let root:Admin = new Admin()
root.auth = 666
console.log(root.auth)

//成员重写
class Tank {
    x:number=11
    y:number=33
    protected myname:string = "坦克"
}

class PlayerTank extends Tank{
    //x:string = '22',    //错误，成员重写类型需要一直
    x:number = 100
    y:number = 23
    reply(){
        console.log("我是玩家坦克")
    }
    tell(){
        console.log(this.myname)
    }
}

//
const t:Tank = new PlayerTank()

//t.reply();  
if(t instanceof PlayerTank){
    t.reply()
}

//保护成员
const p:PlayerTank = new PlayerTank()
p.tell();
// console.log(p.myname); //不可访问
// console.log(Tank.myname)   //不可访问


console.log("*******抽象类****")

abstract class  Chess{
    abstract readonly name:string
    abstract rule() :void
}
class Horse extends Chess {
    name:string = "马"
    rule(){
        console.log(this.name,"走日")
    }
}

var horse = new Horse()
console.log(horse.rule())

//模板模式
abstract class Computed {
    abstract add1:string
    abstract add2:number
    result(){
        if(this.add1.charCodeAt(0) > 99){
            console.log('成员1不符合条件')
            return "-1"
        }
        if(this.add2 <13){
            console.log('成员2不符合条件')
            return "-1"
        }
       return this.step3(this.add1,this.add2)

    }
    protected abstract step3(arg1:string,arg2:number):string

}
class A extends Computed {
    add1:string = 's'
    add2:number =7
    step3(arg1:string,arg2:number){
        return arg2+arg1
    }
}
class B extends Computed {
    add1:string='a'
    add2:number=189
    step3(arg1:string,arg2:number){
        return (arg2-arg1.charCodeAt(0)).toString()
    }
}
var cpa = new A();
console.log("a",cpa.result())

var cpb = new B()
console.log('b',cpb.result())