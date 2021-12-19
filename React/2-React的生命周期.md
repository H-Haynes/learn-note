# React的生命周期

[toc]

## 初始化阶段

初始化属性和状态，运行constructor,同一个类组件的constructor==只会运行一次==
**不能在constructor使用setState**，无法在组件挂载前调用setState，除非是异步，但是异步也无法保证调用时已经被挂载，所以应禁止使用

## 即将挂载 componentWillMount(新版已移除)

**正常情况下和构造函数一样，它也只会运行一次，它可以使用setState，但是不允许使用！**
因为在某些特殊情况(如SSR)，它可能多次运行

## ==render==

返回一个虚拟DOM，会被挂载到虚拟DOM树，最终渲染到页面的真实DOM
它可能不止执行一次

不要在此使用setState，每次改变数据都会调用render，造成无限递归

## 挂载完成==componentDidMount==

- 只执行一次
- 可使用setState
- 常将xhr，计时器等一开始需要进行的操作在此处开始执行
- 组件进入活跃状态

## 活跃状态

### 属性变化 componentWillReceiveProps(新版已废弃)

- 即将接收到新的属性值
- 参数为新的属性对象
- 该函数可能导致一些bug，已被废弃,getDericedStateFormProps代替

### 属性、状态变化 ==shouldComponentUpdate==

- 重点，性能优化点，指示react是否需要重新渲染该组件，通过返回boolean来判定
- 默认情况直接返回true

比如在此判断属性和状态是否和原来的一致，如果一直则不重新渲染，从而节约效率

### static getDerivedStateFormProps(新版) 

较少使用
静态属性，替换willreceiveprops,禁止用户使用反模式，由于是静态函数，该函数无法获取到当前对象，从而能起到阻止使用反模式的效果。
其参数有两个，一个是新的属性，一个是新的状态;
返回值: 
    返回null则不改变当前状态
    该函数的返回值或覆盖掉组件状态
    该函数基本没有什么用
    返回对象则替换原来的(了解，用来强制统一单数据来源)

    反模式：React官方认为，数据的来源应该是单一的，但是有的开发者使用了多来源，如:
        a组件有一个n属性，a组件可以自己控制n的变化;
        a组件将n传递给b组件，b组件的某个出示状态就是n,b的某个属性是和n状态关联的;
        开发者想在a控制n变化时，同时同步b的出示状态，在旧版句可能在willreceiveprop中操作n,这样会导致b中和n状态关联的那个属性的值，可以通过改变a的n获得，也能通过b的属性获得，导致了多来源,这是反设计模式的，在特殊情况下会出现问题

### 即将重新渲染 componentWillUpdate(新版废弃)

之后会执行 render

### getSnapshotBeforeUpdate 获取更新前快照(新)

- 执行时期：真实dom构建完成，但是还没有渲染到页面时
- 常在该函数中进行附加的dom操作，希望绕过react（该函数执行时已经渲染到页面，已经绕过了react）,如滚动条位置、动画效果
- 该函数的返回值会作为componentDidUpdate的第三个参数
- 参数有两个：新的状态和属性
- 需要和componentDidUpdate联合使用

### 重新渲染完成 componentDidUpdate

重新渲染完成
常在该函数中进行一些dom操作

### 销毁 ==componentWillUnmount==

通常在该函数销毁一些依赖资源，如定时器、计数器

        import react,{Component} from 'react'
        import reactDom from 'react-dom'
        export default class lifecircle ectends Component{
            constructor(prop){
                super(prop);
                this.state = {
                    name:"张三" 
                    age:28
                 }
            console.log("组件状态初始化完成")
        }

        componentWillMoumt(){
            console.log("组件即将被挂载")
        }
        componentDidMount(){
            console.log("组件挂载完成！")
        }
        componentWillReceiveProps(newProps){
            console.log('新的属性值是',newProps)
        }
        render(){
            return (
                <div>
                <span>{this.state.name}</span>
                <i>{this.state.age}</i>
                </div>
            )
        }
        }
