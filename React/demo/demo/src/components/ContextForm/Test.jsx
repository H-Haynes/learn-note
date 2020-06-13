import React, { Component } from 'react'
import ContextForm from "./index"

export default class Test extends Component {
    static defaultProps = {
        onSubmit:(formData)=>{
            setTimeout(_=>{
                alert('提交成功');
            },3000)
            console.log(formData)

        }
    }
    render() {
        return (
            <div>
                <ContextForm onSubmit={(formdata)=>{
                    this.props.onSubmit(formdata)
                }}>
                    <div>
                        <ContextForm.input type="text" placeholder="请输入账号" label="账号" name="account" />
                        <ContextForm.input type="password" placeholder="请输入密码" label="密码" name="password"/>
                    </div>
                    <ContextForm.button>登录</ContextForm.button>
                </ContextForm>
            </div>
        )
    }
}
