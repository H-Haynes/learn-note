# React 

[toc]

## 项目搭建

create-react-app 项目名
凡使用JSX的地方必须导入React

## 传递元素内容

### 内置组件传递(div p span ...)

    <div>
        我是传递的内容
    </div>

### react组件传递

将内容以jsx使用属性传入，然后在组件中将props.属性名显示到页面
在自定义组件传递元素内容，则react会将元素内容作为children属性传递过去,所以可以直接使用props.children

## 表单元素

* 受控组件 ：组件的使用者有权利完全控制该组件的行为和内容,通常情况下，受控组件旺旺没有自身的撞他，其内容完全受到属性的控制(函数组件)
* 非受控组件 ： 组件的使用这没有能力控制该组件的行为和内容，组建的行为和内容完全自行控制。
* **表单组件默认是非受控组件,加上value就是受控组件了,但是如果想让他作为受控组件，应设置defaultValue，而不是value**

如果设置成了受控组件而不设置readOnly或onChange的话，会抛出一个警告，设置readOnly则表示只读状态，不可改变值，如果设置了onChange时间，则可以通过这个事件来改变value，达到受控的目的

## 属性默认值和类型检查

### 属性默认值

通过一个静态属性来设置 ：defaultProps 告知React组件的属性默认值

    通用方式设置:
        组件名.defautProps = {
            a:124,
            b:232
        }
    
    类组件除了这种方法还可以使用static来设置
    
        static defaultProps = {
            a:124,
            b:224
        }
    类组件的外部传值和默认值的合并是在构造函数执行前完成

### 属性类型检查

是指希望传递过来的属性的类型限制,需要使用prop-types库，非第三方库,但需要引入,脚手架自带
对组件使用静态属性```propTypes```告知如何检查属性类型.

    static defaultProps = {
        b:4
    }

    static propTypes = {        //必填项都应作出检查
        a:PropTypes.number.isRequired, //a必须为数字类型,且为必传项 
        onChange:PropTypes.func,        //必须为函数,但可不传
        c:PropTypes.any.isRequired, //任意类型，但必填
    }

    /**其他类型列举
        PropTypes.node:任何可被渲染的类型，数字、字符串、React元素,null和undefined被视为未传递，加上必填验证就会出错
        PropTypes.element:React元素
        PropTypes.elementType:React元素类型，即不是react元素，而是构造函数，传组件而不是组件元素（不是传<Test /> 而是 Test）   
        PropTypes.instanceOf(constructor):指定为某构造函数的实例
        PropTypes.oneOf(["male","female","monster"]);   //枚举，必须是其中的某一个值
        PropTypes.ArrayOf(PropTypes.xxx);   //必须是某一类型组成的数组
        PropTypes.ObjectOf(PropTypes.xxx);  //对象由某一类型组成
        PropTypes.shape({
            name : PropTypes.String,
            age:PropTypes.number,
            sex:PropTypes.oneOf(['man','woman']),
            love:PropTypes.array
        }); //对对象进行约束
        PropTypes.exact();//和shape类似，但是必须精确匹配，不能多出属性
        PropTypes.oneOfType([propTypes.number,propTypes.string]);   //必须是其中一个类型
        function(props,propName,componentName){ //自定义检查

        }

    */
执行的顺序是先混合在验证

## HOC 高阶组件

High-Order Component，通常可以利用它实现横切关注点，不关注传入组件内的东西

    有多个组件，每个组件在创建组件和销毁组件时，需要做日志记录
    有多个组件，需要显示一些内容，得到的数据完全一致
不要在高阶组件更改传入组建的东西
不要在render中使用高阶组件

## ref 元素引用

reference,dom元素的引用，和vue的作用完全一致.
场景:希望直接使用dom元素/自定义组件中的某个方法

- 作用于html组件，得到dom元素
- 作用于类组件，得到这个类组建的实例
- **不能作用于函数组件**
- ref不再推荐使用字符串赋值，未来版本可能会移除，推荐使用对象或者函数赋值:

==对象方式==:
使用**React.createRef** 来生成
    
    var test = Reaact.createRef();

    <Comp ref={this.test}>

    this.test.current就能拿到这个组件实例

==函数方式==:

    <Comp ref = { (el) => this.test = el }>
    this.test就能拿到实例了，不需要current
它的执行时机:

1. componentDidMount,可在这个钩子中使用ref了
2. 旧的函数被新的函数替代,即componentDidUpdate之前
       1. 旧的函数被调用时，传递null,
       2. 新的函数被调用时，传递对象。
   所以被替代时，它会执行两次,如果不想每次执行两次，可以使用以下方式:

        getRef = el =>{
            this.test = el 
        }
        <Comp ref = {this.getRef()} />
3. ref所在组件被卸载时，将会执行(componentWillUnmount)

### ref转发 React.forwardRef

1. 参数，传递的是函数组件,不能是类组件，并且需要第二个参数来得到引用
2. 返回值，返回的一个新的组

如果目的是得到组件内部的元素的引用，就需要使用ref转发;

    例如有类组件A，A有一个方法生成了一个h1(就是函数生成的),那么想要使用ref拿到h1组件的引用,就可以使用转发
    function getH1(props,ref){
        return <h1>
            <span ></span>
        </h1>
    }

    const NewH1 = React.forwardRef(getH1);  //传递函数组件，返回新的组件，使用这个新的。（看上去实际上就是一个高阶组件）
    <NewH1 />
    使用newH1后打印这个newH1得到的是个null,使用第二个参数能将ref设置到制定元素身上具体引用到谁身上(这就是转发了)，
    newH1把ref转发至getH1，然后getH1通过ref设置到具体元素

如果想要给类组件添加:

    class A extends React.Compontent{
        render(){
            return (
                <h1 ref={this.props.ref1}>
                    <span></span>
                </h1>
            )
        }
    }

    <A ref1 = {this.props.ref1}>
    //其实就是当做普通属性传进来

    如果想使用foewardRef:
        const NewA = React.forwardRef((props,ref)=>{
            return <A {...props} ref1 = {props.ref}/>
        })

## Context

执行环境
1. 某个组件创建了上下文后，其所有后代组件都可以访问这个上下文
2. 如果某个组件依赖于上下文，则该组件不再纯粹（纯粹是指数据仅来自props）
3. 一般情况用于第三方组件（通用组件）

### 旧版

**创建上下文** 
只有类组件可以创建上下文
1. 给类组件书写静态属性==childContextTypes==,使用该属性对上下文中的数据进行类型约束（必写）

        static childContextTypes = {
            a:PropTypes.number,
            b:PropTypes.string
        }

2. 添加实例方法getChildContext.该方法返回上下文中的数据(设置上下文的数据),数据类型必须满足约束,该方法会在每次render之后运行

        getChildContext(){
            return {
                a:123,
                b:"fff"
            }
        }

**使用**
如果要使用上下文中的数据，组件必须要有一个静态属性contextTypes,该属性描述需要使用个上下文中数据的类型(约束),可以在创建上下文约束是使用变量，这里使用属性来赋值

    static contextTypes = {
        a:PropTypes.number
    }
可以通过构造函数的第二个参数获得上下文,(实际并不需要我们执行构造函数的，它是自动执行)

    constructor(props,context){
        super(props,context);
        console.log(this.context)
    }

*函数组件中通过第二个参数获取上下文数据*

    funA.contextTypes = {
        a:Proptypes.number
    }
    function FunA(props,context){

    }

**上下文中的数据变化**
上下文中的数据不可以直接变化，最终都是通过属性状态变化来改变
在上下文中加入一个方法，可以直接更改数据的方法,子组件就能改编数据了(和事件一样)
自己创建了上下文，再从上下文取数据，拿到的是最近=祖先的上下文

### 新版

旧版的API存在严重的效率问题和漏洞
新版的上下文是一个独立于组建的对象，和组件没有直接的关系,该对象通过**React.createContext**创建
上下文包含了两个属性:

1. Provider属性:本质上是一个组件,上下文生产者，该组件会创建一个上下文,后面想要创建上下文，则使用该组件将所有后代组件包含,通过该组件的value属性值来改变默认值.
 **该组件最好不要复用，仅在一个组件使用**,如果其他组件要使用，应该将上下文*提升至共同祖先级组件中*

        生产者:
        const ctx = React.createContext({       //上下文默认值
            a:123,
            b:"fff"
        })
        export default class NewContext extends Component {
            state = {
                a:456
            }
            static contextTypes = ctx;  //关联
            render() {
                const Provider = ctx.Provider;

                return (
                    <ctx.Provider value={()=>{
                        a:this.state.a
                    }}>
                        <div>
                            
                        </div>
                    </ctx.Provider>
                )
            }
        }

        使用者:(方式和旧版一致,但是数据个是有了变化)

**使用上下文中的数据**
必须拥有静态属性contextType,该属性必须赋值一个上下文（即关联上下文）
可在上下文创建一个方法用于改变值，后代组件调用这个方法就能改变值了
this.context.changeValue().....

在类组件中直接使用this.contet获取上下文数据
在函数组件中需要使用consumer来获取上下文数据

2. Consumer属性

消费者，也是一个组件,在函数组件中用来获取上下文,它的子节点是一个函数(它的props.children是一个函数)
类组件也可使用该方式

    <ctx.Consumer>
        {value =>{
            <>
                a的值:{value.a}
                b的值:{value.b}
            </>
        }}
    </ctx.Consumer>
如果上下文提供者中的value属性发上变化，会导致其所有后代组件全部重新渲染，无论该后代元素是否有优化(ShouldComponentUpdate钩子函数),强制更新


## 插槽 Portals

Protals插槽和Vue的插槽不是同一个东西，Vue的插槽和React的children更接近
Protals是在代码层级不变，显示上是将React元素插入到另一个地方

比如:

    在代码层级上:
        <A>
            <B>
                <C></C>
            </B>
        </A>
        <div class="truth"></div>
    想要将C组件渲染到truth元素里面:
        ReactDOM.createProtal(<C></C>,document.querySelector(".truth"));
ReactDOM.creactProtal接受两个参数:

1. 要插入的React元素
2. 插入的真实DOM
注意事件冒泡==依然遵循虚拟DOM的顺序==，所以会导致看上去C组件在truth里面，但是A,B组件也能接收到事件的触发

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

使用,将错误边界套在会出错的组件外部

    <ErrorBound>
        <ErrorComponent></ErrorComponent>
    </ErroeBound>
**某些错误在错误边界中无法捕获**:

1. 自身组件的错误
2. 异步错误
3. 事件中的错误

## React中的事件

React内置的DOM组件中的事件:
1. 给dcoument注册事件
2. 几乎所有的元素的事件处理，均在document的事件中处理的
3. 在document的时间处理，React均会根据虚拟dom的完成事件函数的调用
4. 如果在真实dom注册了事件并阻止了冒泡，react事件将不会触发
5. React事件的参数非真实DOM事件参数，是React合成的一个对象，类似于真实Dom参数
6. 如果给真实dom注册了事件，将会先于React事件运行
7. react事件中阻止事件冒泡，无法阻止真实dom事件
8. 可通过native.stopImmediaPropagation阻止document上的剩余事件
9. 在事件处理程序中，不要异步的使用事件对象( 事件对象是被重用的)
