# 响应式数据

[toc]

## 获取响应式数据

|      API        |       传入      |      返回      |    备注      |
| :-------: | :---------: | :-----------------: | :-------------------: |
|    reactive     |   plain-object  |     对象代理    |    深度代理对象中所有成员 |
|    readonly     |   plain-object  |     对象代理    |    只可读取代理对象的成员，不可修改 ｜
|    ref          |       any       |   {value:...}  |    对value的访问是响应式的，如果value的值是对象，则会通过reactive函数进行代理，如果是一个代理，直接返回代理对象 |
|     computed    |    function     |   {value:...}   |    读取value时，根据情况决定是否运行函数 |

+ 如果想要让一个对象变为响应式数据，使用reactive 或 ref
+ 如果想让一个对象的所有属性只读，使用 readonly
+ 如果想让非对象数据变为响应式，使用ref
+ 如果要根据已知的响应式数据得到新的响应式数据，使用computed

## 使用

```javascript
import {reactive} from "vue"
const data = reactive({a:1,b:2})
const data1 = ref({a:1,b:2})
```

由于Proxy仅能代理对象，所以若想要对基本数据类型使用响应式，需要使用ref,ref将数据封装成了对象
使用reactive和readonly返回的代理对象，可以直接使用``data.a``来访问数据
使用ref,computed返回的是一个对象，其value是代理对象,需要使用``data1.a``来访问

## 监控数据变化 watchEffect

在vue3中，如果要监听一个数据的变化，可以使用该方法,
当页面使用了响应式数据，则这些响应式数据将会被作为依赖，在该函数可对数据变化后的数据进行其他操作
可将相关操作提取为单独模块

```javascript
    import {ref,watchEffect} from "vue"
    export default {
        setup(){
            const somethingRef = ref([122,23,4])
            watchEffect(()=>{
                console.log(somethingRef.value);
                sessionStorage.setItem('test',somethingRef.value);
            })
            return {
                somethingRef
            }
        }
    }
```

提取示范:

```javascript
    //file useSomething.js:
    import {ref,watchEffect} from "vue"
    export function useSomething(){
        const somethingRef = ref([122,23,4])
        watchEffect(()=>{
            console.log(somethingRef.value);
            sessionStorage.setItem('test',somethingRef.value);
        })
        return {
            somethingRef
        }
    }

    //file comp.vue
    import {useSomething} from "useSomething.js";
    export default {
        setup(){
            const {somethingRef} = useSomething()
            return {
                <!-- somethingRef -->
                ...useSomething()
            }
        }
    }
```

## 计算属性 computed

可从vue中导出computed,computed也是响应式数据，完整的参数为一个对象，包含get和set两个方法，如果仅有get，可使用函数

```javascript
    import {computed} from "vue";
    export  default function somethingRef(){
        const someComputedRef =  computed(()=>{
            return '计算结果'
        })
        return {
            someComputed
        }
    }
```

computed仅数据有变化且调用其value时才会运行，该值有缓存，如果没有数据变化，则会返回之前缓存的值，而不执行函数

## watch 与watchEffect

```javascript
const state = reactive({a:1,b:2})

const stop = watchEffect(()=>{
    //该函数会立即执行，并追踪函数中用到的响应式数据，响应式数据变化时，该函数重新运行
    console.log(state.a,state.b)
})
state.a ++ ;
state.b ++ ;
//该函数为异步的，多次改变也只会执行一次
stop();//停止监听
```

### watch

等同于vue2的$watch,指定监听哪些数据，变化时，将新、旧值返回
该函数不会立即运行,当值改变后才会运行，可加上immediate则会立即运行

```javascript
const state = {a:1,b:2}
watch(()=>state.a,(newval,oldval)=>{

})


==为什么不直接使用state.a== ? 
//因为state.a会直接读取值，也就是1，不是响应式数据，无法监听

const base = ref(6);
watch(base,(newval,oldval)=>{

})

//监听多个数据使用数组,
watch([()=>state.a,()=>state.b,base],([new_a,new_b,new_base],[old_a,old_b,old_base])=>{

},{
    immediate:true
})
```

**watch和watchRffect当依赖项变化时，回调函数都是异步的(微任务)**
==一般都使用watchEffect==
watch应用场景：

+ 不希望回调函数一开始就执行的
+ 数据改变时，需要参考旧值
+ 需要监控一些回调函数中不会用到的数据
 + 就是watch参数要有那些数据，但是回调函数又不使用，比如调试时监听那些数据，变化时只是打印个变化了

## 判断

 isProxy 判断数据是否由reactive 或 readonly生成
 isReactive 判断数据是否由reactive创建
 isReadOnly 判断数据是否由readonly创建
 isRef 判断数据时是ref对象


## 转换

 unref 等同于 isRef(val) ? val.value : val

 应用:
 todos = unref(list)


toRef 得到一个响应式对象某个属性的ref格式（{value:...}）

```javascript
const state = reactive({a:1,b:2})
const bRef = toRef(state,'b')

state.b++;//bRef响应式会受到影响，b.value 值也为3
```

toRefs 把响应式数据的所有属性转为ref格式，并包装到一个plain-object中返回

```javascript
const state = reactive({a:1,b:2})

const stateAllRef = toRefs(state)
```

stateAllRef是普通对象，不是代理,其属性全是ref

应用：
想将一个响应式数据拆解，但是直接拆解后的数据不再具有响应式，可以使用toRefs

```javascript
setup(){
    const state1 = reactive({a:1,b:2})
    const state2 = reactive({a:3,b:4})
    
    return {
        ...state1, //丢失响应式
        ...toRefs(state2) //响应式保留下来了
    }
}

function usePos(){
    return reactive({a:1,b:2})
}

setup(){
    const {a,b} = usePos(); //丢失响应式
    const {a,b} = toRefs(usePos()); //保留响应式
}
```
