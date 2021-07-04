# 响应式数据

[toc]

## 监控数据变化 watchEffect

在vue3中，如果要监听一个数据的变化，可以使用该方法,
当页面使用了响应式数据，则这些响应式数据将会被作为依赖，在该函数可对数据变化后的数据进行其他操作
可将相关操作提取为单独模块


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

提取示范:


    file useSomething.js:
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

    file comp.vue
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


## 计算属性 computed

可从vue中导出computed,computed也是响应式数据，完整的参数为一个对象，包含get和set两个方法，如果仅有get，可使用函数


    import {computed} from "vue";
    export  default function somethingRef(){
        const someComputedRef =  computed(()=>{
            return '计算结果'
        })
        return {
            someComputed
        }
    }