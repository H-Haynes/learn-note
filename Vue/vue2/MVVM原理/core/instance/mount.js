import VNode from "../vdom/vnode.js";
import { prepareRender } from "./render.js";
import {model} from "../gammer/model.js"
import { forInit } from "../gammer/for.js";
/**
 * 应对先建Due实例，后面再挂在的情况
 * @param Due Due实例
 */
export function  initMount(Due){
    Due.$mount = function(el){
        let vm = this;
        let rootDom = document.querySelector(el);
        mount(vm,rootDom)
    }
}

export function mount(vm,el){
    console.log("挂载");
    vm._vNode = constructVNode(vm,el,null);
    //准备预渲染 建立渲染索引，通过模板找vNode,通过vNode找模板
    prepareRender(vm,vm._vNode)
}


/**
 * 创建虚拟DOM Tree
 * @param {*} vm 实例
 * @param {*} elm 真实dom
 * @param {*} parent 父节点
 */
export function constructVNode(vm,elm,parent){ //深度优先搜索

    let vNode = analyzeAttr(vm,elm,parent); // 分析属性,(v-for会有返回)
    if(vNode ==null){
        let children = [];
        let text = getNodeText(elm);
        let nodeType = elm.nodeType;
        let data = null;
        let tag = elm.nodeName;
        vNode = new VNode(tag,elm,children,text,data,parent,nodeType);
        
        if(elm.nodeType == 1 && elm.getAttribute('env')){
            // 有env属性，将env合并到vNode.env
            vNode.env= mergeAttr(vNode.env,JSON.parse(elm.getAttribute('env')));
            // elm.removeAttribute('env')
            //移除env属性
        }else{
            vNode.env = mergeAttr(vNode.env,parent ? parent.env : {}); // 继承父级的环境
        }
    }
    console.log(vNode.elm.nodeType == 0)
    let childs =vNode.elm.nodeType == 0 ? vNode.parent.elm.childNodes :  vNode.elm.childNodes;

    for(var i = 0; i < childs.length;i++){ // 遍历子节点，递归生成虚拟dom树
        let childNodes = constructVNode(vm,childs[i],vNode);
        if(childNodes instanceof VNode){// 单个
            vNode.children.push(childNodes)
        }else{  // 多个
            vNode.children = vNode.children.concat(childNodes);
        }
    }

    return vNode;
}

/**
 * 获取文本节点
 * @param {*} elm 真实dom
 */
function getNodeText(elm){
    if(elm.nodeType == 3){ // 3为文本节点
        return elm.nodeValue;
    }else{
        return ""
    }
}

/**
 * 分析属性
 */
function analyzeAttr(vm,elm,parent){

    if(elm.nodeType == 1){
        let attrNames = elm.getAttributeNames();
        // 是否包含v-model

        if(attrNames.includes('v-model')){
            model(vm,elm,elm.getAttribute('v-model'));
        }
        if(attrNames.includes('v-for')){ // key,value in list
            return forInit(vm,elm,parent,elm.getAttribute('v-for'))
        }
    }
}

/**
 * 属性合并
 * @param {*} objA 
 * @param {*} objB 
 */
function mergeAttr(objA,objB){ // 快速克隆无法克隆代理对象
    return Object.assign({},clone(objA),clone(objB))
}

function clone(obj){
    let target = null;
    if(obj instanceof Array){
        target = [];
        for(var i = 0; i< obj.length;i++){
            target[i] = clone(obj[i])
        }
    }else if(typeof obj == "object"){
        target = {};
        for(let prop in obj){
            if(obj.hasOwnProperty(prop)){
                target[prop] = clone(obj[prop])
            }
        }
    }else{
        target = obj
    }
    return target
}