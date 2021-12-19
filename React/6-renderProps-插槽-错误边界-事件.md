# renderProps\插槽\错误边界

[toc]

## render Props

某些组件的功能及逻辑几乎相同，仅界面不同时，可以采用下列方法解决

1. HOC高阶组件
2. render props
   1. 将render要渲染的东西，作为属性传入,该属性为函数，返回值用于渲染，render时调用该属性(函数)
   2. 该通常叫做render，不强制,和children效果差不多

## Portals 插槽

和vue的插槽不同,react中指将一个react元素渲染至指定DOM容器中，和vue3的`Teleport`的效果更接近

`ReactDom.createPortal(React元素，真实DOM容器)`，返回值为一个React元素

```javascript
    function Comp(props){
        return ReactDom.createPortal(<h1>gg</h1>,document.querySelector("#target))
    }
```

比如:

```javascript
    // 在代码层级上:
    <A>
        <B>
            <C></C>
        </B>
    </A>
    <div class="truth"></div>
    //想要将C组件渲染到truth元素里面:
    ReactDOM.createPortal(<C></C>,document.querySelector(".truth"));
```

虚拟DOM树与真实DOM树结构是可以有差异的

==注意事件冒泡==
react的事件经过包装了，它的冒泡是根据虚拟DOM树冒泡的，而非真实DOM树

## 错误边界

在React中，一个组件在render期间发生错误，会导致整个组件树被卸载
错误边界是一个组件，该组件会捕获到**渲染期间子组件**发生的错误(类似try...catch)，并有能力阻止这个错误向上传播
捕获错误的方式:

1. 使用生命周期捕获错误 getDerivedStateFromError
   1. 该函数为静态函数，不可使用this
   2. 运行时间为渲染子组件过程中发生错误后,在更新页面之前
   3. 注意:只有子组件发生错误才会运行,自身发生错误不会执行
   4. 该函数返回一个对象，React会将该对象的属性覆盖掉当前组件的state
   5. 参数：错误对象
   6. 常用于改变状态
2. 使用生命周期函数 componentDidCatch 捕获错误
   1. 该生命周期为一个实例方法
   2. 运行时间为：渲染子组件的过程中发生错误，页面更新**之后**，运行时组件树已经卸载，执行后无错误再重新渲染组件树，所以不会在改函数中处理状态！
   3. 参数为:错误对象、错误摘要信息
   4. 该函数通常用于记录错误消息

```javascript
    export default class ErrorBound extends PureComponent {
        static getDerivedStateFromError(){
            return {
                hasError : true
            }
        }
        render(){
            if(this.hasError){
                    return <p>该组件发生错误</p>
            }
            else return (
                
                <div>

                </div>
            )
        }
    }
```

使用,将错误边界套在会出错的组件外部

```javascript
    <ErrorBound>
        <ErrorComponent></ErrorComponent>
    </ErrorBound>
```

**某些错误在错误边界中无法捕获**:

1. 自身组件的错误
2. 异步错误
3. 事件中的错误

## React中的事件

React内置的DOM组件中的事件:

1. 给`document`注册事件
2. 几乎所有的元素的事件处理，均在`document`的事件中处理的
3. 在`document`的时间处理，`React`均会根据`虚拟dom`的完成事件函数的调用
4. 如果在`真实dom`注册了事件并阻止了冒泡，`react`事件将不会触发
5. `React`事件的参数非`真实DOM`事件参数，是`React`合成的一个对象，类似于真实Dom参数
6. 如果给`真实dom`注册了事件，将会先于`React`事件运行
7. `react`事件中阻止事件冒泡，无法阻止`真实dom`事件
8. 可通过`native.stopImmediaPropagation`阻止`document`上的剩余事件
9. 在事件处理程序中，不要异步的使用事件对象( 事件对象是被重用的)
