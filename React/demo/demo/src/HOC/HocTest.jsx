import React from 'react'

export default function HocTest(Comp) {
    
    return class Log extends React.Component{
        componentDidMount(){
            console.log(`日志:${Comp.name}组件被创建! --- ${new Date().toLocaleString()}`)
        }
        componentWillUnmount(){
            console.log(`日志:${Comp.name}组件即将被销毁! ----- ${new Date().toLocaleString()}`)
        }
        render() {
            return <Comp {...this.props}/>
        }

    }
}


