# vue生命周期

## 挂载流程

+ 检查vue实例的el属性是否有值,如果没有则检查是否有$mount,也没有则不做解析
+ 如果有值则先去查看是否有template，有的话后面的dom都以这个模板为基准进行操作
+ 如果template没值就通过el找到相应的dom元素,并获取到该元素的outerhTML
+ 然后根据这个outerHTML字符串作为模板去生成抽象语法树(AST)
+ 使用vue的rander函数根据AST生成虚拟节点(虚拟 dom);
+ 将插值表达式等作出解析
+ 将虚拟dom转为真实dom元素，并替换掉原来的dom（el）

## 生命周期流程

+ `new Vue()`创建vue实例
+ 初始化
  + 初始化vue，包含一些事件处理方法，如监听等事件
  + 执行`beforeCreate`函数,无法使用`this`
  + 初始化，引入一些依赖，如我们定义的数据等
  + 执行`created`函数,可以使用`this`
+ 挂载
  + 检查是否有`el`，没有则等待使用`$mount`挂载
  + 检查是否有`template`,有则将template放入`render`函数执行，没有则拿到`el`的`outerHTML`做为`template`
  + 执行`beforeMount`函数,使用`this.$el`拿到的是以前的dom
  + 创建`vm.$el`（虚拟节点）并替换原来的`dom`
  + 执行`mounted`函数,使用`this.$el`拿到的是当前`vnode`替换后的，也就是在页面显示的
  + 挂载完毕
+ 更新
  + 如果数据更改，则执行`beforeUpdate`
  + 虚拟`dom`重新渲染和比对，然后`updated`，不要在`updated`修改数据，会造成死循环
+ 销毁
  + 当`vm.$destroy`函数被调用时
  + 先执行`beforeDestroy`函数
  + 关闭监听，事件监听，子组件等
  + 实例被销毁
  + 执行`destroyed`函数

`activated`:适用于`<keep-alive></keep-alive>`组件，被 keep-alive 缓存的组件激活时调用。
`deactivated`:适用于`<keep-alive></keep-alive>`组件,被 keep-alive 缓存的组件失活时调用。
`errorCaptured`:`2.5+`可用，在捕获一个来自后代组件的错误时被调用。
