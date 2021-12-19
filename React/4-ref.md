# ref引用

reference,dom元素的引用，和vue的作用完全一致.
场景:希望直接使用dom元素/自定义组件中的某个方法

- 作用于html组件，得到dom元素
- 作用于类组件，得到这个类组建的实例
- **不能作用于函数组件**
- ref不再推荐使用字符串赋值，未来版本可能会移除，推荐使用对象或者函数赋值:

==对象方式==:
使用**React.createRef** 来生成

```javascript
    var test = React.createRef();

    <Comp ref={this.test}>

    // this.test.current就能拿到这个组件实例
```

==函数方式==:

```javascript
    <Comp ref = { (el) => this.test = el }>
    //this.test就能拿到实例了，不需要current
```

它的执行时机:

1. componentDidMount,可在这个钩子中使用ref了
2. 旧的函数被新的函数替代,即componentDidUpdate之前[ref的值发生了改变]
       1. 旧的函数被调用时，传递null,
       2. 新的函数被调用时，传递对象。
   所以被替代时，它会执行两次,如果不想每次执行两次，可以使用以下方式:

    ```javascript
            getRef = el =>{
                this.test = el 
            }
            <Comp ref = {this.getRef()} />
    ```

3. ref所在组件被卸载时，将会执行(componentWillUnmount)

## 使用ref的情况

应当谨慎使用ref,能用属性和状态控制就不要用ref

1. 调用真实dom对象中的方法
2. 某个时候需要调用类组件的方法

## Ref转发

ref转发又叫`forwardRef`

在外部组件想获得内部组件的引用时，可以使用ref转发(可在函数组件使用ref转发)

`forwardRef`参数为一个==函数组件==，返回一个新的组件,不能使用类组件，并且函数中组件必须有第二个参数，即ref


```javascript
    function A(props){
        return <h1></h1>
    }
    const NewA = React.forwardRef(A);
    export default class B extends React.Component{
        ARef = React.createRef();
        render(){
            return (
                <>
                    <NewA ref={this.ARef}></NewA>     
                </>
            )
        }
    }
    
```

ARef得到的是null,无任何值,需要自己控制ref，A组件此时第二个参数为ref的值,可以指定它绑定到谁

```javascript
    function A(props,ref){
        return <h1 ref={ref}></h1>
    }
```

`类组件ref转发`:使用ref(不是forwardRef)通过普通属性传入即可

`HOC转发`：约定传入一个属性代表要转发的ref,检测到该属性则将该属性设置到HOC内部组件,将返回值改为使用ref转发的返回值（之前是一个组件）

```javascript
    function C(){
        class HocComp extends React.Component{
            render(){
                const {abc,...rest} = this.props; // 分解出ref
                return (
                    <>
                        <Comp ref={abc} {...this.props} />
                    </>
                )
            }
        }
        return React.forwardRef((props,ref)=>{
            return <HocComp {...props} abc={ref}/>
        })
    }
```
