# 介绍

redux是一个专门用于做状态管理的JS库(非react插件库)
它可用于react/vue/angular等项目，但基本与react配合，其他框架有更适合的
用于集中管理react应用中多个组件**共享**的状态

## 场景

1. 某个组建的状态，需要让其他组件随时获取(共享)
2. 一个组件需要改变另一个组件的状态（通信)
3. 能不用就不用，不用比较吃力时才使用
4. 需要手动监听变化更新界面(store.subscribe监听，并手动触发更新)

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

reducer有两个作用：初始化状态、加工状态
reducer第一次调用时是由store自动触发的，传递的preState是undefined

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

## action

### 异步action

1. 同步action返回值为普通对象，异步action返回值为函数
2. 当要对状态进行操作，但具体数据靠异步任务返回时，就需要异步action
3. 异步action函数有一个参数dispatch，用于调用同步action，不必再引入store
4. 异步action返回值为函数，store不接受，需要使用redux-thunk库配合applyMiddleware进行处理
5. 异步action不是必须要写的，可等待异步任务结束，再去分发同步action

## react-redux

官方redux库

1. 所有的ui组件都应该包裹一个容器组件，他们是父子关系
2. 容器组件是真正和redux交互的，可随意使用redux api
3. ui组件不能使用任何redux api
4. 容器组件会传递给ui组件：redux保存的状态、操作状态的方法，均通过props传递
5. 无需手动监听数据变化，react-redux会自动完成界面更新

## 连接ui组件与容器组件

容器组件需要使用react-redux库来创建

```javascript
    import Count from "/pages/count"; // ui组件
    import {connect} from "react-redux"; // 引入连接函数
    import {increment} from "./redux/countActions"
    function mapStateToProps(state){
        return {
            count:state
        }
    }
    function mapDispatchToProps(dispatch){
        return {
            increment:data => dispatch(increment(data))
        }
    }
    export default  connect(mapStateToProps,mapDispatchToProps)(Count); // 创建容器
```

connect第一次调用的参数需要为两个函数：

1. `mapStateToProps`函数的返回值(object)作为状态传递给了ui组件，其Key为ui组件props的key,value就作为ui组件的props的value
2. `mapDispatchToProps`函数的返回值也是object，也是以属性方式传递给ui组件，包含了操作状态的方法

容器组件的store需要通过上级组件传入(可使用Provide)

简化：

```javascript
    import Count from "/pages/count"; // ui组件
    import {connect} from "react-redux"; // 引入连接函数
    import {increment} from "./redux/countActions"

    export default  connect(state=>({count:state}),dispatch=>({
        increment:data=>dispatch(increment(data))
    }))(Count); // 创建容器
```

高级优化,mapActionToProps，可以是对象:

```javascript
    import Count from "/pages/count"; // ui组件
    import {connect} from "react-redux"; // 引入连接函数
    import {increment,decrement} from "./redux/countActions"

    export default  connect(
        state=>({count:state}),
        {
            increment,
            decrement
        }
    )(Count); // 创建容器
```

### 整合

上面的写法需要ui组件+容器组件，分成了两个组件，数量呈倍数增长，可整合为一个组件,容器和ui都在一个文件中书写

```javascript
    import {connect} from "react-redux"; // 引入连接函数
    import {increment,decrement} from "./redux/countActions"
    // ui 组件
    function Count(props){
        return (
            <div>
                <Button onCLick={props.increment(5)}>increment
                </Button>
            </div>
        )
    }

    export default  connect(
        state=>({count:state}),
        {
            increment,
            decrement
        }
    )(Count); // 创建容器
```

## 多状态共享

多状态多reducer，reducer需要使用combineReducers进行合并,**传入的对象就是redux保存的总状态对象**

```javascript
    import {combineReducers} from "react-redux"
    const allReducers = combineReducers({
        count:countReducers,
        person:personReducers
    })
    export default createStore(allReducers,applyMiddleware(thunk))
```
