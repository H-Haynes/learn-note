let num = 1;
export default class VNode{
    /**
     * 
     * @param {*} tag 标签类型,DIV,SPAN,INPUT,#TEXT
     * @param elm 对应真实节点
     * @param children 子节点
     * @param text 当前虚拟节点中的文本内容
     * @param data //VNode Data 暂无用
     * @param parent 父节点
     * @param nodeType 节点类型
     */
    constructor( tag,elm,children,text,data,parent,nodeType){
        this.tag = tag;
        this.elm = elm;
        this.children = children;
        this.text = text;
        this.data = data;
        this.parent = parent;
        this.nodeType = nodeType;
        this.env = { // 当前节点的环境变量，读的谁的属性

        };
        this.instructions = null; // 存放指令
        this.template = [] ; //当前节点涉及的模板，暂无用
        this.number = num ++ ;
    }
}