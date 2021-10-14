# ES6

[toc]

## 介绍

ES6是指ES的第六个版本，发布于2015年，因此也称为ES2015，由于ES6和ES5发布年限跨度较大2009-2015，因此新增了比较多的功能.此后每年都有发布新版本，ES7,ES8,ES9,ES10...
ES6引入的语言新特性，规范操作，提升易读性，方便操作，简化项目开发复杂度，降低出错概率，提升开发效率
但是在低版本浏览器并不支持ES6语法，所以需要使用工具将ES6语法通过转换降级为ES5语法

## 变量声明let/const与var

`var`会进行声明提升，可重复定义，全局变量挂载至window,作用域为全局作用域，函数作用域
`let/const`:不会声明提升，不可重复定义，不会挂载至window，作用域为块级作用域

使用let/const声明的变量，不可再声明之前使用，因为该变量处于TDZ(`Temp Death Zone`)暂时死区，不可读取,因此会报错 xx is not define

```javascript
    let a = 10;
    {
        console.log(a);
        let a = 11 ; // error ,不会读取外部的a  ，但里面的又还未被声明，报错 a is not define
    }

```

let/const可以解决闭包的问题

## spreed & rest 运算符

rest运算符功能强大

1. 可以将数组解开为单个的值 `console.log([1,2,3]);// 1,2,3`;
2. 可以将一堆值合成数组

  ```javascript
    function test(...arg){
        console.log(arg)
    }  
    test(1,2,3,4); // [1,2,3,4]
  ```

3. 对象操作

``` javascript
    let obj1 = {name:'a',age:2};
    let obj2 = {name:'b',sex:1,call:{fname:"hello"}}
    let obj = {...obj1,...obj2}
    //obj is {name:'b',age:2,sex:1,call:{fname:'hello'}}
```

**此处对象进行了克隆操作，但是是浅层克隆**
**该方法处理函数（对象上的方法），正则等会失效**

## 对象合并assign

```javascript
    Object.assign({},obj1,obj2);//将对象合并为一个对象，注意也是浅层克隆
    Object.assign({},obj1);// 浅层克隆
```

## destructuring 解构赋值

```javascript

    let obj = {
        name:"杨帆",
        age:22
    }
    let arr = [26,27];
    let {name, age} = obj; //对象解构，name='扬帆',age=22
    let {a,b} = arr; // 数组解构 a=26,b=27;
    let {0:a,1:b} = arr //数组解构，同上
    let {length:len} = arr; // 获取数组长度并重命名 len=2;
    let {name:myName,age:myAge} = obj; //解构并重命名:myName=扬帆 myAge=22
    let {name:myName,age:myAge,sex=1};//默认赋值,sex默认值为1
    let [,x] = arr; //跳跃赋值, x = 27;
```

## 箭头函数

该功能极为重要

- 箭头函数**没有原型**prototype
- 箭头函数本身**没有this**
- 箭头函数的this指向为：**定义时继承的第一个非箭头函数的this**,==和使用位置没有关系==,被继承的那个函数的this改变，那么箭头函数的this也会改变
- 箭头函数**不能直接修改this**,可以修改它的超集实现
- 箭头函数定义时，**外层没有非箭头函数，this指向window,无论是否严格模式**
- 箭头函数**本身没有arguments**，如果使用arguments,使用的是定义时非箭头函数的arguments(继承)
- 箭头函数**不可使用new操作符**
- 箭头函数**不支持参数重命名**
- 箭头函数在**箭头和参数位置之间不可使用换行符**
- 箭头函数**不支持new.target**
- 箭头函数**无需使用function关键字定义**

## ES5 defineProperty

该功能为实现vue双向数据绑定的核心部分
`Object.defineProperty(对象，属性，描述符)`

| 描述符 | 值 | 默认值 | 释义 |
| ----- | -- | ----- | -----|
| value| any | "" | 对象的属性值 |
| writable | Boolean | false | 是否可写 |
| configurable | Boolean | false | 是否可配置 |
| enumerable | Boolean | false | 是否可枚举 |
| set | function | function | 写操作时调用此方法 |
| get | function | function | 读操作时调用此方法 |
| get/set 与value,writeable不可并存，势不两立 |

**Object.prototype不可枚举，不可写**
**var声明的全局变量不可configurable(delete)**

```javascript
    var obj = {name:123};
    Object.defineProperty(obj,"name",{
        enumerable:false,
        writeable:false,
        configurable:false
    })
```

使用const定义的变量，由于是引用值，总是能被意外的修改，而使用defineProperty将writeable设置为false,就能达到不可修改的效果

**使用var声明的对象读写配置默认都为true**

## 数据劫持

Vue的双向绑定功能有`Observer`,`Compile`,`Watcher`三部分，Observer部分功能实现使用的就是`object.defineProperty`

Observer是检测数据变化进行相应的回调(数据劫持)

```javascript
    // update用来更新双向数据，对input和显示的con 的值作同步更新
    function update(){
        put.value =  con.innerText = data.value;
    }
    // 监听输入变化，输入的值立即作用到对象上
    put.oninput = function(){
        data.value = this.value
    }

    // 建立观察函数，监听对象属性值的变化
    function Observer(obj){
        if(!obj || typeof obj !== 'object'){ // 如果传入的不是一个对象，直接返回，容错处理
            return obj；
        }else{
            Object.keys(obj).forEach(key=>{ //对每个属性进行defineProperty设置
                definedReactive(obj,key,obj[key])
            })
        }
    }

    function definedReactive(data,key,val){
        Object.defineProperty(data,key,{
            get(){ // 读取函数，返回值即可
                return val
            },
            set(newVal){
                if(newVal == val) return ; // 值无改变，不进行操作
                val = newVal(); // 更新val为最新的值
                update(); // 同步更新显示的数据
            }
        })
    }
```

启用Observer即可进行双向数据绑定，但是obj内可能包含引用值，需要递归的拆解属性
也无法处理数组，需要借用数组的方法，也无法对新增属性进行处理(Vue2也无法监听到新增的属性)

## Proxy/Reflect 代理和反射

Proxy有13种拦截方式，Reflect有13种静态方法，对应Proxy的13种拦截行为

针对上面的defineProperty对内部引用值还需要递归处理等问题，使用代理/反射能解决该问题
setter和getter控制属性的读写时功能强大

```javascript
    let proxy = new Proxy(data,{    //data: 拦截的目标对象
        set(target,key,value,receiver){ // 目标对象 属性名 属性值 proxy实例本身
            Reflect.set(target,key,val); // 相当于: target[key] = val
            update()
        }
        get(target,key,receiver){ // 目标对象，访问的属性，代理对象
            return Reflect.get(target,key);
        }
    })
```

## 类 class

继承: `Object.setPrototypeOf(obj1.prototype,obj2.prototype)`

```javascript
class A {
    static showAge(){ // 静态方法非公有也非私有，为A类持有,使用A.showAge()
        console.log(22)
    }
    constructor(name){
        this.name = name || ''; //私有属性
    }
    learn(){
        console.log('study'); // 公有方法，如同A.prototype.learn , 实例来调用
    }
    sex = "female"; //私有属性，ES7新增
}
```

不可以再内部添加私有属性

class 继承

```javascript
 class B extends A {
     constructor(name){
         super(name);
         this.teacher = "ji"
     }
 }
```

class 不可直接执行，必须使用new操作符
prototype不可枚举
静态属性需要放到类下，而非原型

### ES7的class

新增了：

1. 静态属性: `static age = 22;`
2. 私有属性: title = "私有属性"
3. @decorator 装饰器
浏览器不支持ES7，使用插件转换为ES5，`@babel/plugin-proposal-class-properties`
使用：在babelrc的plugin属性配置：

```json
    {
        "plugin":[
            ["@babel/plugin-proposal-class-properites",{"loose":true}]
        ]
    }
```

装饰器是对其后的属性进行修饰(类也可以装饰),装饰器名称自定义，需要对这个名称写一个对应的函数

```javascript
    class A {
        @readOnly sex = "man";
    }

    function readOnly(proto,key,descriptor){ // 原型、 修改的属性 修饰(类似defineProperty)

    }
```

## Set

Set是一个构造函数，一种新的存储数据的结构
**Set只有属性值，且值唯一不重复**
参数需要**具有迭代器接口**(即symbol.iterator属性),常见的可迭代对象有：[],'',arguments,NodeList

字符串使用set会拆分并去重

- `add`: 添加成员
- `delete`: 删除成员
- `has`: 查看成员
- `clear`: 晴空成员
- `foreach`: 遍历成员,使用for...of 也可以

Set转Array:

```javascript
 let sets = new Set([1,2,3,2,1]);
 let arr = Array.from(sets);
 // 或
 let arr1 = [...sets];

 // 取并集(去重)
 let arr2 = new Set([...arr3,...arr4]);
 // 取交集
 let oS1 = new Set(arr1);
 let oS2 = new Set(arr2);
 let arr = [...oS1].filter(ele=>oS2.has(ele))

 //差集 互无
 let oS3 = new Set(arr1);
 let oS4 = new Set(arr2);
 let newArr1 = [...oS3].filter(ele=>!oS2.has(ele))
 let newArr2 = [...oS4].filter(ele=>!oS1.has(ele)
 let target = [...newArr1,...newArr2]
```

## Map

key 和value 对应且唯一，key=>value,任意值都可以做key,包括对象参数要求每一个都是数组
通过set方法后进行船只，参数为k,v
通过get进行取值,不可使用属性方式取值，取引用值需要事先存储key

实现原理：

1. 链表
2. Hash算法
3. 桶存储结构

实现源码:

[Map数据结构实现原理]('./map.js');

## Promise 异步编程

承诺必定给出一个结果，无论成功与失败

```javascript
    setTimeout(()=>{
     console.log("setTimeout")
    },0);
    new Promise((resolve,reject)=>{
     console.log(0);
        resolve(1);
    }).then((res)=>{
        setTimeout(()=>{
            console.log(res);
        },0)
        
    },(err)=>{
        console.log("err:"+err)
    });
    console.log(2);
    // 先注册外部setTimeout
    // 同步执行Promise
    // 同步执行2的打印
    // 异步执行then,注册resolve的setTimeout
    //结果:	0  2   setTimeout  1;
```

在执行栈中setTimeout,异步回调等属于宏任务,**微任务有优先执行权**

- `then`:如果不抛出错误，后面会一直执行resolve回调，return会作为下一个then的回调的参数,如果当前出现错误，那么后面的回调一定执行reject
- `catch`:标准捕获异常，也可以在reject中对错误进行捕获，但不规范，只要后面有一个对异常处理(console,catch..)，就不会报错
- `finally`: 不论成功失败最终都会执行
- `all`:并发，多个异步任务全部完成将触发resolve,有一个失败则会reject
- `race`: 将最先完成的任务状态触发后面then，看谁跑得快

[查看Promise实现源码]('./promise.js')

## iterator 迭代器

内部迭代器：本身是函数，内部定义好迭代规则，完全接手迭代过程，外部只需要一次初始调用
如：[].forEach..$.each...

外部迭代器：本身是函数，执行返回迭代对象，迭代下一个元素必须显示调用，复杂度增加但灵活性增强

```javascript
    function outerIterator(obj){
        let index=0;
        let next=()=>{
            return {
                value:obj[index],//每次返回一个对象
                done:obj.length===++index//标记是否迭代结束,并使下标增加
            }
        }
        return {next}
    }
    let tor=outerIterator(arr);
    tor.next();
    tor.next();
    .....
```
目的：迭代对象的多样化，不再限于数组，可直接对set,map,nodelist,arguments等操作

## Symbol

1. 第七种数据类型
2. 不可使用new，
3. 具有唯一性，symbol页可以做对象属性名，具有唯一性，但是取值需要使用预存的变量名去取

```javascript
    let per=Symbol(12);
    obj={
        [per]:"this is a symbol property"
    }
    console.log(obj[per]);//注意：使用属性方式是无法取到的
    //传的参数会被使用toString转换
    let Sym=Symbol("abc"); //symbol(abc);注意不是字符串
    let sym1=Symbol({name:"sdd"};//symbol([object object])
```

对于不可迭代的数据，可以手动部署symbol.iterator接口,详见上文

## Generator 生成器

本身是函数，返回迭代对象，内部配合yield，分段执行，**遇到yeild暂停**；
在外部使用next来执行yeild语句，如果执行完了再yeild是undefined;

形式:  `function * test()`

Generator也是一种函数，它也是用来解决异步，深度嵌套问题，现在有async,比generator更好用的了。

```javascript
function * test(){
yield "先执行这里1";
yield "再执行这里2";
yield "还知性这里3";
yield "自行这里4";
return "最后这里";
}
var  tr=test();
//console.log(tr);
tr.next();//执行第一个yield
tr.next();//执行第二个yield
```

next里面有一个**done**属性，代表这个是否执行完（即是否最后一个{return}），如果为true那么tr全部执行完了，再次next（） value是undefined
上面使用了手动调用，但tr实际是一个对象，因此可使用迭代器自动调用，也可以解构,rest,等
**蛇形执行方式**
