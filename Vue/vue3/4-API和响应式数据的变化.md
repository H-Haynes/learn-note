# API和响应式数据

[toc]

## 删除了Vue构造函数

vue3使用createApp来创建vue应用,(event bus将无法再使用了？)
```createApp(根组件).mount(根节点)```

在vue2中，若一个页面有多个vue应用，在使用插件等东西时，需要使用Vue.use\mixin\component等，将会影响到所有的vue应用
```new Vue().$mount(根节点)```

原因：vue2的全局构造带来了诸多问题

+ vue2 调用构造函数的静态方法会对所有vue应用生效，不利于隔离不同应用
+ vue2 构造函数集成太多功能，不利于tree shaking,vue3将这些功能使用普通函数导出，能够充分利用tree shaking优化打包的体积
+ vue2没有把组件实例和vue应用两个概念区分开
  + 在vue2中，通过new Vue创建的对象既是vue应用，也是特殊的vue组件
  + vue3将两个概念区分开， 通过createApp创建的对象是一个Vue应用，它内部提供的方法是针对整个应用的，而不再是一个组件

## vue3响应式数据

vue2和vue3数据响应式在beforeCreate和created之间完成，详情见vue官方vue生命周期示意图，但是实现不同

vue3不再使用Object.defineProperty的方式定义完成数据响应式，而是使用Proxy
除了Proxy本身效率比Object.defineProperty更高之外，由于不必递归便利所有属性，直接得到一个proxy。
所以在vue3访问数据是动态的，访问谁得到谁，当访问某个属性是，再动态的获取和设置，极大提升初始阶段的效率

proxy还可以监控到成员的新增和删除，所以vue3中新增成员、删除成员、索引访问都可以触发重新渲染，在vue2中无法做到

## 组件实例中的api

vue3的组件实例是一个Proxy，仅提供下列成员，功能和Vue一致：
```$data\$props\$el\$options\$parent\$root\$slots\$refs\$attrs```
```$watch\$emit\$forceUpdate\$nextTick```
很多属性不再暴露出来，仅能访问Proxy的东西