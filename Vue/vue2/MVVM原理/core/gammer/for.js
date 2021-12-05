
import VNode from "../vdom/vnode.js"
import { getValue } from "../util.js";
/**
 * 解析v-for
 * @param {*} vm 
 * @param {*} elm 
 * @param {*} parent 
 * @param {*} instruction // (key,val) in list
 */
export function forInit(vm,elm,parent,instructions){
    let virtualNode  = new VNode(elm.nodeName,elm,[],"",getVirtualNodeData(instructions)[2],parent,0); // 0 虚拟节点
    virtualNode.instructions = instructions; // 之前在VNode类上定义的这个属性派上用场啦!
    // 删除for模板的指令，批量生成dom,
    parent.elm.removeChild(elm);
    parent.elm.appendChild(document.createTextNode('')); //删除了一个都东西，咱用文本节点填回去，让dom树和虚拟🌲结构变化没那么大

    /// 分析指令，创建相应的dom

    let result = analyzeInstructions(vm,instructions,elm,parent);

    return virtualNode;
}

/**
 * 解析v-for指令语句
 * @param {} instructions 
 */
function getVirtualNodeData(instructions){
    let insSet = instructions.trim().split(" ");
    if(insSet.length !=3 || insSet[1] !='in' && insSet[1] != 'of'){ // 指令不是三段式/指令中间不是for or of关键字 
        throw new  Error("v-for语法错误")
    }else{
        return insSet
    }
}


/**
 * 解析生成真实dom
 * @param {}} vm 
 * @param {*} instructions 
 * @param {*} elm 
 * @param {*} parent 
 * @returns 
 */
function analyzeInstructions(vm,instructions,elm,parent){
    let insSet = getVirtualNodeData(instructions);

    let dataSet = getValue(vm.$data,insSet[2]); // (k,v) in list  的 list
    if(!dataSet){
        throw new Error(`${insSet[2]}不可被遍历，因为它没有值或不存在`)
    }
    let resultDom = [];
    for(let i = 0 ;i<dataSet.length; i++){
        let tempDom = document.createElement(elm.nodeName); // 创建dom
        tempDom.innerHTML = elm.innerHTML;
        // 设置它的数据来源
        let env = analyzeKV(insSet[0],dataSet[i],i); //获取局部变量

        tempDom.setAttribute('env',JSON.stringify(env));     // 将变量设置到dom
        parent.elm.appendChild(tempDom) ;
        resultDom.push(tempDom)
    }

    return resultDom
}

/**
 * 解析key,value,获得v-for的作用域范围内的数据
 * @param {}} instructions 
 * @param {*} value 
 * @param {*} index 
 */
function analyzeKV(instructions,value,index){
    // 检查key带不带括号
    if(/([a-zA-Z0-9_$]+)/.test(instructions)){
        //去除括号
        instructions  = instructions.trim().substring(1,instructions.length-1);
    }

    let keys = instructions.split(",");
    if(keys.length == 0){
        throw new Error("v-for语法错误")
    }
    let obj = {};
    if(keys.length >= 1){ // 设置第一个属性
        obj[keys[0].trim()] = value
    }
    if(keys.length>=2){ //  设置第二个属性
        obj[keys[1].trim()] = index;
    }

    return obj;
}