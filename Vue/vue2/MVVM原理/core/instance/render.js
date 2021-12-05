import {getValue} from "../util.js"
    // 通过模板找到哪些节点用到了这个模板

    //通过节点找到这个节点下有哪些模板

    let template2VNode = new Map();

    let VNode2Template = new Map();
//相互映射    

export function prepareRender(vm,vNode){ //预渲染
    if(vNode==null){
        return;
    }

    if(vNode.nodeType == 3){ //是文本
        analyzeTemplateString(vNode)
    }
    if(vNode.nodeType == 0){ // 虚拟节点
        setTemplate2VNode(vNode.data,vNode)
        setVNode2Template(vNode,vNode.data)
    }
    analyzeAttr(vm,vNode)

    // if(vNode.nodeType == 1){ // 是标签
        // 检查是否还有子节点，有的话递归
        for(let i = 0;i<vNode.children.length;i++){
            prepareRender(vm,vNode.children[i])
        }

    // }


}

/**
 * 分析模板字符串
 * @param  vNode 
 */
function analyzeTemplateString(vNode){
    // {{}}的就被认为是模板占位
    const tempReg = /{{[a-zA-Z0-9_.\s]+}}/g;
    const templateStrList = vNode.text.match(tempReg);
    if(templateStrList){
        for(let i =0 ; i <templateStrList.length;i++){
            setTemplate2VNode(templateStrList[i],vNode);

            setVNode2Template(vNode,templateStrList[i]);
        }
    }   
}


function setTemplate2VNode(template,vNode){
    const templateName = getTemplateName(template);
    let vNodeSet = template2VNode.get(templateName); //尝试从Map中获取:Map每项的值请确保为数组
    if(vNodeSet){ // 有就添加
        vNodeSet.push(vNode)
    }else{ // 无法根据模板名称获得vnode集合,没有该项，向其添加
        template2VNode.set(templateName,[vNode]); // 保证其值是一个数组（一个模板可能对应多个节点，被多次使用）
    }
}


function setVNode2Template(vNode,template){
        const templateSet = VNode2Template.get(vNode);
        if(templateSet){
            templateSet.push(getTemplateName(template));
        }else{
            VNode2Template.set(vNode,[getTemplateName(template)])
        }
}

/**
 * 解花括号
 * @param {}} template 
 */
function getTemplateName(template){
    if(template.substring(0,2) == "{{" && template.substring(template.length-2,template.length) == '}}'){
        var result =  template.substring(2,template.length - 2).trim()
        return result;
    }else{ // 未使用模板
        return template        
    }
}



export function getTemplate2VNode(template){
    return template2VNode
}
export function getVNode2Template(vNode){
    return VNode2Template
}

//渲染,把带有模板的，能被查找到的模板变量转换为数据
function renderNode(vm,vNode){

    if(vNode.nodeType == 3){ // 文本节点才继续
        //通过vNode找模板
        let templates = VNode2Template.get(vNode);

        if(templates){ // 文本节点有模板,替换
            let result = vNode.text;
            for(var i = 0; i<templates.length;i++){

                let templateValue = getTemplateValue([vm.$data,vNode.env],templates[i]);
                //获取模板变量的值,数组的原因是：当前模板的值可能来自due对象、父级节点、methods、for循环等
                if(templateValue != null){
                    result = result.replace(new RegExp(`{{(\\s)?${templates[i]}(\\s)?}}`,"g"),templateValue);
                    // result = result.replace(`{{${templates[i]}}}`,templateValue);
                }
            }

            vNode.elm.nodeValue = result;
        }
    }else if(vNode.nodeType == 1 && vNode.tag=="INPUT"){ //输入框的
        let templates = VNode2Template.get(vNode) ;
        if(templates){

            for(let i =0 ;i< templates.length;i++){


                let templateValue = getTemplateValue([vm.$data,vNode.env],templates[i]); //获取绑定数据的值
                if(templateValue != null){
                    vNode.elm.value = templateValue; // 把值给输入框
                }
            }
        }
    }else{
        //递归
        for(var i = 0;i<vNode.children.length;i++){
            renderNode(vm,vNode.children[i]);
        }
    }
}

export function renderMixin (Due){
    Due.prototype._render = function(){
        renderNode(this,this._vNode)
    }
}

//获取模板变量的值
function getTemplateValue(objs,templateName){
    for(var i = 0; i <objs.length; i++ ){
        let temp = getValue(objs[i],templateName);
        if(temp != null){
            return temp
        }
    }

    return null;
}

/**
 * 属性修改后，自动重新渲染 。修改时，proxy将调用
 * @param {} vm 
 * @param {*} data 
 */
export function renderData(vm,data){
    let vNodes= template2VNode.get(data);
    if(vNodes){
        for(let i = 0; i < vNodes.length;i ++){ 
            renderNode(vm,vNodes[i])
        }
    }
}   

function analyzeAttr(vm,vNode){
    if(vNode.nodeType != 1){
        return;
    }
    let attrNameList = vNode.elm.getAttributeNames();
    if(attrNameList.includes('v-model')){ //如果包含v-model，也要加入到vNode,将绑定的属性存起来
        setTemplate2VNode(vNode.elm.getAttribute('v-model'),vNode);
        setVNode2Template(vNode,vNode.elm.getAttribute('v-model'));
    }

}



export function getVNodeByTemplate(template){
    return template2VNode.get(template)
}

export function clearMap(){
    template2VNode.clear();
    VNode2Template.clear()
}