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

High-Order Component，通常可以利用它实现横切关注点

    有多个组件，每个组件在创建组件和销毁组件时，需要做日志记录
    有多个组件，需要显示一些内容，得到的数据完全一致
