# dva

不仅事第三方库，还是一个框架，主要整合了redux相关内容，方便处理数据，依赖了很多官方库（`react,react-router,react-saga,react-redux,connected-react-router..`)

dva脚手架已被umijs替代

## use

dva默认到处一个函数，调用函数可得到一个应用程序对象

`dva.router`:路由方法，传入一个函数，返回react节点
在入口文件

`dva.start`：该方法用于启动dva程序，也就是react程序，传入一个css选择器(也就是跟组件挂载的元素)

```javascript
    //index.js
    import App from "./App.tsx"
    import dva from "dva"
    const app = dva();
    app.router(()=><App/>); // 设置根路由，即启动后要运行的函数，函数的返回结果将被渲染，就是根组件
    app.start("#root")
```

## 控制仓库

`dva.model`:用于定义一个模型，该模型可理解为redux的action、reducer、redux-saga副作用处理的整合，整合成一个对象，将该对象传入即可
**需在启动之前定义模型**

dva约定reducers中方法的名字就是action

```javascript
    app.model({
        namespace:"counter", //string,值被作为仓库中的属性
        state:0, // 该模型的默认值
        reducers:{ // 每个方法为一个action
            increment:(state,action)=>{
                return state+1;
            },
            decrement:(state,action) =>{
                return state-1;
            }
        },
        effects:{ // 处理副作用，底层使用saga实现，每个方法处理一个副作用,参数1为action对象，参数2为封装好的sageEffect对象
            *asyncIncrement:(action,obj)=>{
                const {type,payload} = action;
                const {call,put} = obj;
                yield call(delay,2000); // delay自己去实现
                // yield put({type:"count/increment"})  //模型内部使用无需加前缀
                yield put({type:"increment"})  
            },
            * asyncDecrement:(action,obj) =>{
                ...
            }

        }
        subscriptions:{ // 该对象可写任意数量、任意名称的属性，每个属性为函数，参数为一个对象，包含dispatch和history,这些函数会在模型加入到仓库后，立即执行,之后不再执行
            log:({dispatch,history})=>{
                window.onresize=()=>{
                      obj.dispatch({type:"increment"});
                }
            }
        }
    })

    app.model({
        namespace:"student",
        state:{
            list:[],
            total:341,
        },
    })
```

```javascript
    // counter组件
    // 🔗仓库
    import {connect} from "dva"

    function Counter(props){
        return <h1 onClick={()=>props.onIncrement()}>{props.number}</h1>
    }

    const mapStateToProps = state =>({
        number:state.counter,
    })
    const mapDispatchToProps = dispatch =>({
        onIncrement:()=>{
            dispatch({type:"counter/increment"})
        },
        onDecrement:()=>{
            dispatch({type:'counter/decrement'})
        },
        onAsyncIncrement:()=>{
            dispatch({type:"counter/asyncIncrement"})
        }
    })
    export default connect(mapStateToProps)(Counter)

```

## dva配置

```javascript

    const app = dva({
        history:createBrowserHistory(), // 同步到仓库的history对象，为上下文提供history对象
        initialState:{}, // 创建仓库时的默认状态，一般不配置，在创建模型时设置了
        onError:(err,dispatch)=>{}, // 仓库运行发生错误时运行的函数
        onAction:({/*中间件对象*/})=>{}, // 触发action时调用，（可做redux中间件）
        onAction:(['中间件数组'])=>{},
        onStateChange:(state)=>{},//仓库状态发生变化时调用
        onReducer:(reducer)=>{
            return (state,action)=>{
               const newState =  reducer(state,action);
               return newState
            }
        }, //进一步封装模型中的reducer,参数为一个reducer,返回新的reducer

        onEffect:() => {}, // 类似对模型中effect封装
        extractReducers:{// 额外的reducer
            abc:(state=12,action){
                return state
            }
        }, 
        extractEnhancers:[(createStore)=>{ //用于封装createStore，dva会将原仓库创建函数作为参数传入,返回一个新的用于创新仓库的函数
            
        }]


    })
    app.router(routerConfig)
```

```javascript
    // routerConfig.js 路由配置
    // 链接路由与redux,并传入history，否则会使用默认创建的history，无法被监听
    import {routerRedux} from "connect-router-redux"
    export default function(props){
        return (
            <routerRedux.ConnectedRouter history={props.history} />
        )
    }
```

## dva插件

通过`dva.use(plugin)`来使用插件，插件实质为一个对象，该对象与配置对象相同，dva会在启动时将其混合到配置中

```javascript
    //myDvaPlug
    const logger = store => next => action =>{
        consola.log("old state:",store.getState('counter'))
        next(action)
        consola.log("new state:",store.getState('counter'))
    }
    export default {
        onAction:logger
    }

    // index.js
    dva.use(myDvaPlug)
```

## dva-loading

 第三方插件
