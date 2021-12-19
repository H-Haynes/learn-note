# HOC高阶组件

## HOF

`Higher Order Function`,高阶函数以函数作为参数并返回一个函数
`Higher Order Component`,高阶组件,以组件作为参数并返回一个组件

## 作用

通常可以利用它实现横切关注点，不关注传入组件内的东西
增强组件功能，增加附加功能
可以进行组合使用，多次包装

**不要在高阶组件更改传入的组件**
**不要在render中使用高阶组件**
通常以`with`开头作为组件名

```javascript
    // two components
    export class A extends React.Component{
        render(){
            return <h1>A</h1>
        }
    }

    export class B extends React.Component{
        render(){
            return <h1>B</h1>
        }
    }

    // HOC

    export default function withLog(Comp,otherParams){
        return class LogWrapper extends React.Component{
            // some functions 
            componentDidMount(){
                console.log(`log:Component${Comp.name} was been Created`)
            }

            componentWillUnmount(){
                console.log(`log:Component${Comp.name} will been destroyed`)
            }
            render(){
                return <Comp {...this.props}/>
            }
        }
    }

    // useAge
    const ALog = withLog(A); // it's a new Component
    const BLog = withLog(B); // it's a new Component
```
