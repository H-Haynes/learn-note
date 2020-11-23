/*导航守卫 onchange和 before一样的*/

import {withRouter,BrowserRouter as Router} from "react-router-dom"
import React, { Component } from 'react'


let location,prevLocation,action,unBlock;

/**用来获取上下文的 */
class _GuardHelper extends Component{
    componentDidMount(){
        //添加阻塞,并将相关信息保存，父组件要用
       unBlock =  this.props.history.block((newLocation,ac)=>{
            prevLocation = this.props.location
            location = newLocation
            action = ac;
            return ""
        })
    }

    componentWillUnmount(){
        unBlock();  //取消阻塞
    }
    render(){
        return null
    }
}

const GuradHelper = withRouter(_GuardHelper)

export default class RouteGuard extends Component {
    types = {
        onBeforeChange:PropTypes.func
    }
    handleConfirm = (msg,commit)=>{
        if(this.props.onBeforeChange){
            this.props.onBeforeChange(prevLocation,location,action,callback)
        }
    }

    componentDidMount(){
        // this.unListen =   this.props.history.listen((location,action,)=>{
        //     if(this.props.onChange){
        //         this.props.onChange(location,action);
        //     }
        //     // this.props?.onChange?.()
        // })

        // //设置阻塞
        // this.props.history.block('确定离开该页面吗？');
        // //Router组件的getUserConfirmation进行处理

        // return unListen



        //,这是根组件了，拿不到history,套一个组件GuardHelper
    }

    componentWillUnmount(){
       // this.unListen();    //取消监听
    }
    render() {
        return <Router getUserConfirmation={this.handleConfirm}>
                <GuradHelper />
                {this.props.children}
        </Router>
    }
}

export default RouteGuard