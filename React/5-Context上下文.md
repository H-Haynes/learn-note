# Context

[toc]

越级数据传递

在组件中创建context，其后代组件均可获取到该对象

## 特点

1. 当某个组件创建了上下文后，上下文中的数据，会被所有后代组件共享
2. 如果某个组件依赖了上下文，会导致该组件不在纯粹（外部数据仅来源于props）
3. 一般情况下用于第三方组件

## 旧版 (version<16)

### 创建上下文

只有类组件才可创建上下文，类组件才有状态

1. 给类组件书写静态属性`childContextTypes`,使用该属性对上下文中的数据类型进行约束，==必要==
2. 添加实例方法`getChildContext`,该方法返回的对象即为上下文中的数据，==必须==满足`childContextTypes`约束,该方法会在每次render后运行

```javascript
    class OldContext extends React.Component{】
        static childContextTypes = {
            age:PropTypes.number.isRequire,
            sex:PropTypes.string
        }

        getChildContext(){
            return {
                age:77,
                sex:'male'
            }
        }

        render(){
            return <>something</>
        }
    }
```

[旧]子组件中使用上下文数据，==必须==要有`contextType`静态属性声明需要使用的上下文，可在构造函数第二参数获取上下文
在子组件中使用上下文：

```javascript
    

    class ChildB extends React.Component{
        // 对要使用的上下文需要先类型声明
        static contextType = {
            age:PropTypes.number.isRequire
        }
        constructor(props,context){
            super(props);
            console.log(context); // 得到上下文
        }
        render(){
            return (
                <h2>来自于上下文的数据age:{this.context.age}</h2>
            )
        }
    }

    // 还可以从属性中获取context,将context交给super;

    class ChildC extends React.Component{
        static contextType = {
            age:PropTypes.number.isRequire
        }
        constructor(props,context){ // 如果不手写构造函数，也会自动运行
            super(props,context);
        }
        //通过this.context即可获取

        render(){
            return (
                <p>来自于context的数据age:{this.context.age}</p>
            )
        }
    }


    // 函数组件中第二个参数即为上下文
    function ChildA(props,context){
        render(){
            <h1>
                来自上下文的sex:{context.sex}
                <ChildB />
            </h1>
        }
    }
    ChildA.contextType = {
        sex:PropTypes.string
    }
```

### 上下文中的数据变化

不可直接变化，最终都是属性状态变化

如果要在子组件中对上下文进行改变，那么创建上下文时，应提供一个改变上下文内容的方法，这样子组件就能调用它来改变状态

### 多组件上下文 就近原则

当有多个父组件，且多个创建有上下文时，有相同属性，他们的类型==必须==一致,
子组件获得的上下文时多个上下文合并的结果(assign)
组件使用context时不会使用自身创建的context获取

```javascript
    // comp1 context
    getChildContext(){
        return {
            age:77,
            sex:'male',
            changeAge:function(age){
                this.age ++ 
            }
        }
    }
    // child1 context
    getChildContext(){
        return {
            age:77,
            sex:'male',
            name:"hello"
        }
    }
```

在上述代码中，如果调用`changeAge`,改变的仍然是`comp1`的数据，因为方法来自它

## 新版(v>16)

旧版存在严重的效率问题,并且容易滥用

### 创建上下文【新】

上下文是独立于组件的对象，与组件不再关联

```javascript
    React.createContext("字符串上下文数据"); // 创建上下文，独立于组件
    React.createContext({
        age:14,
        sex:"male"
    });
    class Comp extends React.Component{

    }
```

新的context返回包含两个属性：`Consumer`、`Provider`
这两个属性本质都是组件:
`Provider`: 一个组件，该组件会创建上下文，有一个value属性，可通过其对上下文重新赋值
`Consumer`:子节点是一个函数，参数为上下文对象，可从其获取

```javascript
    const ctx = React.createContext({ // 创建上下文默认值
        age:1,
        sex:"male"
    })
    class Comp extends React.Component{
        render () {
            const Provider = ctx.Provider;
            return (
                // 通过value属性可对上下文默认值重新赋值
                <Provider value={}>
                    <Child></Child>
                </Provider>
            )
            /* 或下列写法
                return (
                    <ctx.Provider value={{age:22,sex:'female'}}>
                        <Child />
                    </ctx.Provider>
                )
            */
        }
    }
```

`Comp > Provider > Child`

Provider可通过value属性对上下文重新赋值

### 使用上下文

类组件必须拥有静态属性`contextType`,==不是复数==，应赋值为创建的上下文类型，函数组件不再需要

在类组件中直接使用`this.context`获取上下文数据
在函数组件使用`Consumer`获取上下文数据,children必须为函数，返回值会被渲染

```javascript
    function ChildA(props){
        return <div>
            <h1>
                <ctx.Consumer>
                    {val=>val.sex} 
                </ctx.Consumer>
            </h1>
        </div>
    }

    class ChildB extends React.Component{
        static contextType = {};
        render() {
             return (
                 <h1>{ctx.age}</h1>
             )
        }
    }

    class ChildC extends React.Component{
        static contextType = {};
        render() {
            return (
                <ctx.Consumer>
                    {val=>(<h1>{val.age}</h1>)}
                </ctx.Consumer>
            )
        }
    }
```

上下文不要复用,请重新创建,如果有需要，请将上下文放置到公共父组件

### 多上下文

使用上下文名来区分即可，不再遵循就近原则

```javascript
    <ctx1.Consumer>
        {val=>val.name}
    </ctx1.Consumer>

    <ctx2.Consumer>
        {val=>val.age}
    </ctx2.Consumer>
```

**如果provider中的value发生变化， 会导致该上下文提供的所有后代元素全部重新渲染，无论该子元素是否有优化(忽略shouldComponentUpdate返回值)**

`provider value`设置为`state`的属性

## PureComponent 纯组件

用于避免不必要的渲染(运行render),从而提高效率

PureComponent是一个组件，如果某个组件继承自该组件，则该组件的shouldComponentUpdate会进行优化，对属性和状态进行浅比较，如果相等则不会重新渲染

1. PureComponent是进行浅比较
   1. 为了效率应尽量使用PureComponent,
   2. 要求==不该动之前的状态==，永远创建新的覆盖之前的，而不是在之前的状态改变后重新赋值回去（Immutable,将之前的状态当作不可变对象）
2. 函数组件使用React.memo制作纯组件
   1. 本质就是一个HOC,外面套一层Pure类组件，render返回传入的那个组件

```javascript
    // 类纯组件
    export default class Comp extends React.PureComponent{

    }

    // 函数式纯组件，使用memo制作
    function Comp1(props){

    }
    export default React.memo(Comp1);
```
