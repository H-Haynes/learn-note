import React from 'react'
import {Route, Redirect} from "react-router-dom"

export default function index({component:Component,children,render,...rest}) {
    //将componet,children,render三个属性节后出来，Route组件不需要传入这几个，否则和直接使用Route组件一样了
    //然后将剩余的属性(rest)原样放置到Route,我们要对这三个属性处理

    return (
        <Route 
            {...rest}
            render={values=>{
                //判断是否符合进入受保护页面的权限,将组件返回即可
                if('可以进(已登录)'){
                    return Component
                }else{
                    //前去 登录
                    return <Redirect to="/login"></Redirect>
                }
            }}
            >

        </Route>
    )
}
