# 介绍

redux是一个专门用于做状态管理的JS库(非react插件库)
它可用于react/vue/angular等项目，但基本与react配合，其他框架有更适合的
用于集中管理react应用中多个组件**共享**的状态

## 场景

1. 某个组建的状态，需要让其他组件随时获取(共享)
2. 一个组件需要改变另一个组件的状态（通信)
3. 能不用就不用，不用比较吃力时才使用

## store

store为存储状态的地方，使用`createStore`创建仓库,参数为reducer

```javascript
    //store.js
    import {createStore} from "redux"
    import countReducer from "./countReducer.js"
    const store = createStore(countReducer);

    export default store;
```

## reducer

reducer为具体执行者，reducer本质就是一个函数,该函数有两个参数:

1. prevState 之前的状态
2. action 行为

```javascript
    // countReducer.js
    export default function countReducer(prevState,action){
        const {type,data} = action;
        switch(type){
            case '+':
                return prevState + data;
            case '-':
                return prevState - data;
            case '*':
                return prevState * data;
            case '/':
                return prevState / data;
            default:
                return prevState
        }
    }
```
