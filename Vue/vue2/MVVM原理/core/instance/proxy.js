
import { clearMap, prepareRender, renderData } from "./render.js";
import { getVNodeByTemplate } from "./render.js";
import {constructVNode} from "./mount.js"

/**
 * 创建代理
 * @param {*} vm Due对象
 * @param {*} obj 要被代理的对象
 * @param {*} namespace 命名空间
 * mvvm需要知道哪个属性被改变才能进行更新，所以要用对象代理来捕获这个改变的事件
 */
export function constructProxy(vm,obj,namespace){
    // 递归读取进行代理
    let proxyObj = null;

    if(obj instanceof Array){ //数组
        proxyObj = new Array(obj.length);
        for(var i = 0; i< obj.length; i ++ ){
            proxyObj[i] = constructProxy(vm,obj[i],namespace); //代理值
        }

        proxyObj = proxyArray(vm,obj,namespace) ;// 代理方法

    }else if (obj instanceof Object){ // 对象
        proxyObj = constructObjectProxy(vm,obj,namespace);
    }else{
        // throw new Error("cannot proxy data except Array and Object:"+obj)
        proxyObj = obj
    }

    return proxyObj
}


/**
 * 对对象进行代理(注意：实例身上也设置这些属性)
 * @param {*} vm 
 * @param {*} obj 
 * @param {*} namespace 
 * @returns 
 */
export function constructObjectProxy(vm,obj,namespace){
    let proxyObj = {};
    for(let prop in obj){
        Object.defineProperty(proxyObj,prop,{
            configurable:true, // 可配置
            get(){ // 获取值
                return obj[prop]
            },
            set(value){ //设置值(重要，监听改变)
                console.log(`${prop}属性发生改变，值为${value},namespace:${getNameSpace(namespace,prop)}`)
                obj[prop] = value;
                renderData(vm,getNameSpace(namespace,prop))
            }
        })

        Object.defineProperty(vm,prop,{ // 实例也设置属性代理，这样可以直接用组件实例来改变属性
            configurable:true, // 可配置
            get(){ // 获取值
                return obj[prop]
            },
            set(value){ //设置值(重要，监听改变)
                console.log(`${prop}属性发生改变，值为${value},namespace:${getNameSpace(namespace,prop)}`)
                obj[prop] = value;
                renderData(vm,getNameSpace(namespace,prop))
            }
        })


        if(obj[prop] instanceof Object){ //对象嵌套，递归
            proxyObj[prop] = constructProxy(vm,obj[prop],getNameSpace(namespace , prop))
        }
    }
    return proxyObj;
}

/**
 * 代理数组
 */
export function proxyArray(vm,arr,namespace){
    let obj = {
        eleType:'Array',
        toString:function(){
            let result = "";
            for(let i = 0; i < arr.length;i++){
                result = arr[i] + ',';
            }
            return result.substring(0,result.length-1);
        }
    };
    // 重写方法，在调用方法前，加上自己的监听
    defineArrayFunc.call(vm,obj,'push',namespace,vm);
    defineArrayFunc.call(vm,obj,'pop',namespace,vm);
    defineArrayFunc.call(vm,obj,'shift',namespace,vm);
    defineArrayFunc.call(vm,obj,'unshift',namespace,vm);

    arr.__proto__ = obj; //设置原型，使它先使用重写的方法，
    return arr;
}


/**
 * 数组方法重写
 * @param {*} obj 
 * @param {*} func 
 * @param {*} namespace 
 */
function defineArrayFunc(obj,func,namespace,vm){
    Object.defineProperty(obj,func,{
        enumerable:true,
        configurable:true,
        value:function(...args){ //方法重写
            let original = Array.prototype[func];
            const result = original.apply(this,args);
            //此处可监听方法被调用
            console.log(`${namespace},${func}调用`)
            rebuild(vm,getNameSpace(namespace,"")); // 重新构建dom节点
            renderData(vm,getNameSpace(namespace,""))
            return result;
        }
    })
}

/**
 * 设置命名空间，就是当前调用的谁(user.name)
 * @param {*} nowNameSpace 
 * @param {*} nowProp 
 * @returns 
 */
function getNameSpace(nowNameSpace,nowProp){
    if(!nowNameSpace){
        return nowProp
    }
    else if(!nowProp){
        return nowNameSpace
    }else{
        return nowNameSpace + '.' +nowProp; //x.y
    }
}

/**
 * 重新构建相关子节点， 不必重新构建整个页面
 * @param {*} vm 
 * @param {*} template 
 */
function rebuild(vm,template){
    // debugger;
    console.log(template)
    let virtualNode = getVNodeByTemplate(template);
    for(var i =0 ;i < virtualNode.length;i++){
        //清空dom树，还原成虚拟dom，改变虚拟dom后，根据新的虚拟dom重新生成新的dom
        virtualNode[i].parent.elm.innerHTML = "";
        virtualNode[i].parent.elm.appendChild(virtualNode[i].elm); // 还原成虚拟dom
        
        let result = constructVNode(vm,virtualNode[i].elm,virtualNode[i].parent); // 重新构建
        virtualNode[i].parent.children = [result];

        clearMap(); // 清除旧的模板与vNode关系映射
        prepareRender(vm,vm._vNode); // 建立新的模板与vNode关系映射
    }
}


