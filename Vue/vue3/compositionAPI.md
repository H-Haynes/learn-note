# Composition API

[toc]

## setup 函数

1. 在组件被赋值后立即执行，早于所有生命周期，
2. 因此，组件韩没有实例，无法使用this
3. 该函数仅运行1次
4. 该函数有两个参数：
    - props:通过它可以得到属性值
    - context:
      - attrs : 等于Vue2的$attrs
      - slots : 等于Vue2的$slots
      - emit  : 等于Vue2的$emit

不要给setup函数加上async，加上后，setup函数返回的promise，返回promise的情况是suspence组件，该组件标准未定
5. 返回值将被挂在组件实例上,类似于optionAPI的data


## 生命周期对比

|   Vue2 Option API   |   Vue3 Option API   |   Vue3 Composition API      |
| :-----------------: | :-----------------: | :-------------------------: |
| beforeCreate        | beforeCreate        | 无需函数，代码写在setup之中 |
| created             | crated              | 无需函数，代码写在setup之中 |
| beforeMount         | beforeMount         | onBeforeMount               |
| mounted             | mounted             | onMounted                   |
| beforeUpdate        | beforeUpdate        | onBeforeUpdate              |
| updated             | updated             | onUpdated                   |
| beforeDestroy       | **beforeUnmount**   | onBeforeUnmount             |
| destroyed           | **unmounted**       | onUnmounted                 |
| errorCaptured       | errorCaptured       | onErrorCaptured             |
| -                   | ==renderTracked==   | onRenderTracked            |
| -                   | ==renderTriggered== | onRenderTriggered           |

改变：

  1. **组件的销毁(destroy)生命周期变更为卸载（unmount）**
  2. 删除了created和beforeCreated,vue3的数据响应式由开发者定义，不再需要这两个

新增:

- renderTrack
  - 渲染模版时，会收集依赖数据（模板中使用到的数据），响应式变化时，render函数会重新触发
  - 每收集到1个依赖，renderTrack就会触发一次
  - 该函数有一个参数，为收集到的依赖信息
    - debuggerEvent
      - target:跟踪或触发渲染的对象
      - key:跟踪或触发渲染的属性
      - type：跟踪或触发渲染的方式
  - 该函数常用于调试
- renderTriggered
  - 当依赖数据发生改变，导致组件重新渲染时触发该函数

## composition API和 option API 相比有哪些优势

1.为了更好的逻辑复用和代码组织

- 配合reactivity api，可在组件内部进行更加细粒度的控制，使组件不同的功能高度聚合，提升可维护性，对于不同组件的相同功能，也能更好的复用
  
2.更好的类型推导
  
- vue2中的this指向了实例本身，无法进行类型推导
- composition API没有将this指向其他值，变得更加函数式，有利于类型推断

