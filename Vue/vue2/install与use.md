# Vue.use与组件的install

## 为什么在vuex/vue-router使用时需要使用Vue.use，而axios等不需要？

Vue.use 会自动阻止多次注册相同插件,vue.use  接收的 plugin 参数的限制是 Function | Object 两种类型。如果是 Object 那么这个 Object 需要定义一个 install 方法,如果是function则默认为install方法

需要在调用 new Vue() 启动应用之前完成

1. 如果我们传入的 `plugin`(`Vue.use`的第一个参数) 的 `install` 是一个方法,就调用这个 plugin 的 install 方法
2. 并将整理好的数组当成参数传入 `install` 方法中， `plugin.install.apply(plugin, args)；`
3. 之后给这个插件添加至已经添加过的插件数组中，标示已经注册过  `installedPlugins.push(plugin)`
最后返回 Vue 对象。

Vue.use() 的注册本质上就是执行了一个 install 方法，install 里的内容由开发者自己定义
