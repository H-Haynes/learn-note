# vue3差异

[toc]

## main.js

vue2

        import Vue from "vue"
        Vue.use(ElementUi)
        const app = new Vue(options)
        app.$mount("#app")

vue3

        import { createApp } from "vue";
        import App from "./App.vue";
        const app = createApp(App);
        app.use(ElementPlus)
        app.mount("#app");

- Vue3不存在构造函数，vue3没有默认导出模块
- Vue3没有了$mount方法，可以使用mount挂载组件
- 第三方库不再挂载到Vue上，而是在根组件实例上

## 组件

1. Vue3支持option API，可以和vue2一样使用
2. vue2中的this指向组件实例，vue3的this指向一个Proxy，该Proxy代理了组件的实例

        vue2: 

                访问属性 => 组件实例
                               ||
                返回属性 <= 组件实例属性

        vue3:

                访问属性 =>  组件代理对象 =>  组件实例
                                           ｜｜
                返回属性值 <= 组件代理对象 <== 返回属性值

3. **composition API**

   <a href="./compositionAPI.md">详情查看</a>

   option API问题：一个属性相关的操作，分布到methods,watch等多个option内了，极其分散
   composition API将与之相关的内容聚合在一起，增加了相关度，可阅读性，也方便了代码提取，组件提取

4. 没有使用响应式api（ref）创建的数据，改变不会引起页面的渲染，无论是v-mode,模板中改变，methods等

        setup(){
          //let a = 5;
          let a = ref(5)
          const add = ()=>{
            // a++; 
            a.value ++;
          }
          const desc = () =>{
            a.value -- ;
          }
          return {
             a,
             add
          }
        }
   这里的a被封装了，ref返回的是一个访问器对象，该对象的value为5,而在模板中使用a时，却不是一个对象，而是number5,是因为进行过以下操作:


           访问a =>  组件代理对象 => 访问a.value 
                                    ｜｜
           返回5 <=   组件代理对象 <= 返回5

  ==setup中，a是一个对象，在组件实例中，为number 5==

  上列代码可进行提取，因为a相关的和setup无关，也可提取后公用


        import {ref} from "vue"
        function useA(){
           let a = ref(5);
           function add(){
              a.value++
           }
           function desc(){
              a.value--     
           }
           return {
                a,
                desc,
                add
           }
        }

        export default {
                setup(){
                  return {
                     ...useA()
                  }
                }
        }

如此，相关的代码聚集在一块，而且还能够提。s相比optionAPI,还需将a放置于data、function放置于mthods，或更多操作放置于不同的option,代码过于分散

