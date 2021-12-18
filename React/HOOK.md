# HOOK 

[toc]

## State Hook

State Hook是一个在函数组件中使用的函数(useState)，用于在函数组件中使用状态
useState智能在函数组件中调用

useState:

- 该函数有一个参数，这个参数的值标识状态的默认值
- 该函数返回一个长度为2的数组，第一个值为状态的值，第二个为函数，用来改变该状态的函数
  
一个函数组件中可以使用多个状态,这种做法有利于横切关注点

### 原理

1. 当运行一个函数组件数（调用该函数）时，会生成一个组件节点，该节点会持有元素对象
2. 调用useState函数
3. 检查该节点的状态表格
   - 状态表格中无内容
     1. 使用默认值创建一个状态
     2. 将该状态加入表格中(下标0，状态值为默认值)
   - 状态表格中有数据
     1. 直接使用状态表格中的状态替换组件状态（**不像类组件是进行合并的**） 

**多个组件状态不共享，因为状态表格是挂在节点上的**

### 注意细节

- useState 最好写在起始位置，便于阅读
- useState 严禁出现于代码块、判断中（if for ...）
- useState 返回的函数（第二项）引用不变
- 如果使用函数改变数据，若和改变前的值一致（object.is），则不会进行重新渲染,和类组件的setState不一样
- 使用函数改变数据，传入的值不会和原来的数据进行合并，而是直接替换（不同于setState的合并）
- **如果两个状态不相干，应该分开他们，否则可能在设置值时遗漏，导致其他值不存在了，或者使用rest运算符**
- 禁止直接改变状态，必须 使用返回的第二个函数来改变
- 如果要实现强制刷新，可以设置一个空对象的useState : var [,forceUpdate] = useState({})（类组件的强制更新是forceUpdate函数,并且不运行shouldComponentUpdate生命周期）
- 和类组件一样，函数组件的状态改变可能是异步的，因此不能信任之前的状态，如在组件中多次使用setVal(n-1),最终值只是减一次，因为它不是立即执行的，而是事件运行后才执行，因此每次调用setVal时，都是使用的之前状态；解决方法是使用回调函数:setVal(prev=>prev - 1),这个回调是在最后依次执行的（如同事件队列）,只调用一次则可以不使用回调方式


## Effect Hook

Effect Hook是用来在函数组件中的副作用。（渲染完成后我应该做什么）

副作用:
    1. ajax
    2. 计时器
    3. 异步操作
    4. 更改真实DOM
    5. localStorage
    6. 其他会对外部产生影响的操作

函数:useEffect,该函数接受一个函数作为参数，其为处理副作用的操作

1. useEffect执行时期是在**页面完成真是UI渲染后**，该步骤是异步的
    - 与类组件中componentDidMount和componentDidUpdate区别是：这两个生命周期更改了真是 DOM但用户未看到UI 更新,这两个是同步的
    - useEffecr更改了真是DOM,并且用户已经看到UI 更新了
2. 每个函数组件可以使用多个useEffect，但是也不能放入代码块
3. useEffect中的副作用是可以有返回值的，返回值必须是一个函数，该函数叫做清理函数，该函数运行时间为每次运行副作用函数之前。首次渲染组件不会运行（渲染组件，清理函数，副作用函数的顺序）
4. 组件被销毁时，一定运行**清理函数**
5. useEffect是可以传递第二个参数的，参数为数组，包含了这个副作用依赖的数据，如果在更新时这些依赖数据都没有变化，则不会运行副作用 ，副作用函数仅在初次渲染运行，清理函数仅在卸载时运行
6. 副作用函数中如果使用了上下文中的变量，则它无法实时获取状态数据（闭包）
7. 副作用函数在注册时，会覆盖掉之前的副作用函数，应该尽量保持他们的一致，否则会很难控制


## 自定义HOOK

实质上就是将一些常用的、跨越多个组件的HOOK功能，抽离出去，形成一个函数，该函数就是自定义HOOK,
自定义HOOK由于内部需要使用hOOK功能，因此明明应该遵循hook规则，使用use开头
调用自定义HOOK函数也应该在最顶层使用，禁止在代码块中

比如多个组件都需要在第一次加载完成后，获取某个数据（ajax），就可以将这个effect抽离出去
示例

    // useSearchSong.jsx
    import {useEffect,useState} from "React";
    export function useSearch(){
      const [songList,setSongList] = useState([]);
      useEffect(()=>{
        (() => {
          axios.post("/search",{
              keywords,
              limit:size,
              offset:(currentPage-1) *size
          }).then(res=>{
            setSongList(res.data.result)
          })
        })()
      },[keywords,currentPage,size])
      return songList  
    }
    使用时，在组件内使用变量接收这个返回的的songList即可
类组件需要使用高阶组件或者render props来实现

## reducer Hook

原理:
    import {useState} from "react"

    /**
    * 通用reducer函数
    * @param {function} reducer reducer标准参数{state,action}
    * @param {*} initialState 初始状态
    */
    export default function useReducer(reducer,initialState){
        const [state, setState] = useState(initialState)
        function dispatch(action){
            const newState = reducer(state,action);
            console.log(`数据改变:${state} => ${newState}`)
            setState(newState)
        }
        return [state,dispatch]
    }

使用时：在组件中引入useReducer：
    const [page,pageDispatch] = useReducer(pageReducer,1)

    在改变page的地方使用:pageDispatch({type:'',preload:4})
同过这种redux/flux数据流来操作数据

useReducer可使用第三个参数，第三个为一个函数，其返回值会被作为state默认值，并且此时第二个参数将成为该函数的参数

## context Hook

用于获取上下文数据
原来的方式:

```javascript
      export default function A(){
          function Test(){
            return <ctx.Consumer>
                      {value => <h1>{value}</h1>}
                  </ctx.Consumer>
          }
          const ctx = React.createContext();
          <div>
            <ctx.provider value="哈哈">
              <Test />
            </ctx.provider>
          </div>
      }
```

使用Hook:

    function Test(){
      var value = useContext(ctx)
      return <h1.>
              {value}
            </h1.>
    }

## Callback Hook

用于得到一个固定引用值的函数，通常用于性能优化
比如事件处理函数，每次的都是生成的新的，这样会导致处理函数提供者也重新渲染，即使使用了优化（purcomponent或自己优化),也可能导致优化失效
useCallback会固定函数的引用，如果依赖不发生变化，则不会改变引用地址
第一个参数为callback,第二个参数为一辆项，返回值为目标函数

## Memo Hook

用于保持一些稳定的数据，常用于性能优化，比如一些高开销 ，需要经过计算的值，保持不变可以优化性能

## Ref Hook

用于保持元素引用不变，接受一个参数默认值
返回一个固定的对象：{current:值}

比如一个函数组件包含定时器，我们需要给它一个timer,但是函数组件可能多次使用，timer必须保存到节点，而不能放在全局，否则一个节点写在，会导致所有timer停止，这里就可以使用useRef来保存这个timer的引用
此处的ref和元素无关


    const [n,setN] = useState(10);
    const ref = useRef(n)
    useEffect(()=>{
      const timer =   setTimeout(()=>{
          
          ref.current--;
          setN(ref.current);
          if(ref.current === 0){
            clearTimeout(timer)
          }
        },1000)

        return ()=>{
          clearTimeout(timer)
        } 
    },[])

## imperativeHandle Hook

场景：外部组件想要调用内部组件的方法；
  但是内部组件是个函数组件，不能通过组件.方法去调用

第一个参数为ref,第二个为默认值，为函数，返回值作为ref.current的值,也是返回{current:值}格式,第三个参数依赖项
如果不给依赖项，则每次都会调用

  function B(props,ref){
    //正确:
    useImperativeHandle(ref,1)
    fn(){
      console.log("B的专属方法")
    }

    render (<.h1 ref={ref}>组件B</.h1>)
  }

  class A extend React.component{
    const ref = React.forwardRef(); //ref转发
    return <.div>
          <.B></.B>
          <.button>点我调用B的fn</.button>
      </.div>
  }
  这里的点击事件不能使用B.fn，因为B是一个函数组件

  ## layoutEffect Hook

时间点：更改了DOM，浏览器在下次渲染时间点到达前对比差异，进行渲染，用户看到新效果，这是异步操作，在这个过程中layoutEffect执行，赶在看到新效果之前

用法和useEffect完全一致，只是执行时间点不同：
useEffect:浏览器渲染完后，用户看到新的渲染结果之后useLayoutEffect:完成了dom改动，但还没有呈现给用户

应尽量使用useeFFECT,因为他不会阻塞渲染，如果出现问题在考虑使用layputEffect hook


DebugValue Hook

useDebugValue:用于将自定义HOOk关联的数据显示到调试栏
如果创建的自动以Hook通用性较高，可以选择使用useDebugValue,使用方式是useDebugValue("打印的值")
