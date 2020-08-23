import React, { Component } from 'react'
import qs from 'qs'
export default class login extends Component {
    render() {
        return (
            <div>
                登录页,授权跳回
                if(this.props.return_url){
                    this.props.history.push(this.props.return_url)
                }else{
                    this.props.history.push('/')
                }
            </div>
        )
    }
}
