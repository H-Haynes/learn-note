# vue2与vue3效率对比

[toc]

## 介绍

与vue2相比：

+ 客户端渲染效率提升1.3 ～ 2倍
+ SSR渲染效率提升2 ～ 3倍

效率提升的提现：

## 静态提升

静态节点：没有元素节点，没有绑定动态内容

    vue2的静态节点
    render(){
        createVNode("h1",null,"hello world")
    }

    vue3的静态节点，提取出来，直接使用
    const hoisted = createVNode("h1",null,"hello world"); //直接用const，因为不会变化
    function render(){
        //直接使用hoisted 
    }

静态属性提升

    vue2
    <div class="user">{{user.name}}</div>

    vue3
    const hoisted = {class:"user"}

    function render(){
        createVNode("div",hoisted,user.name)
    }


## 预字符串化 (重)

当编译器遇到**大量连续**(目前为连续20个节点)的静态内容，会直接将器编译为一个普通字符串节点

    <div class="container">
        <div class="logo">
            <h1>logo</h1>
            </div>
        
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>
        <div class="user">
            <span>{{user.name}}
        </div>
    </div>

编译器将会智能的处理为字符串节点

    const hoisted = _createVNode("<div class=\"container\"><div class=\"logo\"><h1>logo</h1></div><ul><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li></ul>)

减少了虚拟dom树节点

## 缓存事件处理函数

```<button @click="count++>plus</button>```

vue2处理：

    render(ctx){
        return createVNode("button",{
            onClick:function($event){
                ctx.count ++
            }
        })
    }

vue3处理：

    render(ctx,_cache){
        return createVNode("button,{
            onClick:cache[0] || (cache[0] = ($event) => (ctx.count++)
            //从缓存对象中读取，若无则创建该事件，并存入缓存对象
        })
    }

若事件处理函数不会改变，则会将处理函数存入缓存对象，渲染时从缓存对象中读取

## Block Tree

vue2在对比新旧虚拟dom树时，并不知道哪些节点是静态的，哪些节点是动态的，所以只能一层一层的比较，浪费了较多时间
而vue3将静态节点已经进行了提取，并使用了const，静态节点不会变化，所以不会进行静态节点的比较，而且前面的预字符串，也已经极大的减少了虚拟dom树的节点数量m

## PatchFlag

vue2在对比每个节点时，无法判定该节点哪些信息将会变化，只能依次对比

vue3将会记录哪些信息是动态的，在对比时，直接比对这个标记：

    _creareVNode("span",{
        class:_ctx.user.name
    },_toDoisplayString(_ctx.user.name),3 /* TEXT,CLASS */)
    标记了text，class为动态的