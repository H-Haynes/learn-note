var colors = require('colors');

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
})
type cb<T,S> = (key:T,value:S) => void


class Dictionary <T,S>{
    private keys:T[] = []
    private values:S[] = []
    private _size:number =0
    setItem(key:T,value:S){
        let index:number = this.keys.findIndex(ele=>ele == key);
        if(index!=-1){  //已存在,重设值
            this.values[index] = value;
            console.log(colors.bold.bgGrey.blue(' success: '),colors.grey(`已重设${key}的值为:${value}`))
        }else{
            this.keys.push(key);
            this.values.push(value);
            console.log(colors.bold.bgGrey.blue(' success: '),colors.grey(`添加新属性成功:{${key}:${value}}`));
            this._size ++
        }
    }
    delItem(key:T){
        let index:number = this.keys.findIndex(ele=>ele==key);
        if(index!=-1){
            this.keys.splice(index,1);
            this.values.splice(index,1);
            console.log(colors.bold.magenta.bgGrey(' warn: '), colors.dim.magenta(`已删除属性${key}`))
            this._size -- ;
        }else{
            console.log(colors.bold.bgGrey.red(' error：'),colors.dim.red("该属性不存在"))
        }
    }

    print(){
        let obj = {};
        for(var i=0;i<this.keys.length;i++){
            var prop = this.keys[i];

        }
    }
    forEach(callback:cb<T,S>){
        this.keys.forEach((ele,index)=>{
            callback(ele,this.values[index])
        })
    }
    hasKey(key:T):boolean{
        return this.keys.includes(key)
    }
    get size():number{
        return this.keys.length
    }
}


const myDic = new Dictionary<string,number>()

myDic.setItem('name',9534);
myDic.setItem('name',934);
myDic.setItem('sex',1)
myDic.setItem('age',27);
myDic.setItem("surplus",8992)
myDic.forEach((key,value)=>{
    if(value<1000){
        console.log(colors.italic.grey('小于1000的属性:',key))
    }
})

console.log(colors.italic.grey('是否存在name:',myDic.hasKey("name")));
console.log(colors.italic.grey('是否存在favorite:',myDic.hasKey("favorite")));
console.log(colors.italic.grey("当前字典长度:",myDic.size))

myDic.delItem("name");
console.log(colors.italic.grey('是否存在name:',myDic.hasKey('name')))
myDic.delItem("prop")
console.log(colors.italic.grey("当前字典长度:",myDic.size))
