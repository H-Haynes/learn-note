import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Modal from "./components/Modal"


export default class Testmodal extends Component{
    state = {
        modal:false
    }

    hideModal = () => {
        this.setState({
            modal:false
        })
    }
    showModal = () => {
        this.setState({
            modal:true
        })
    }

    render(h) {
        return (
            <div>
                    <h1>这里是React项目测试</h1>

                <p>
                    <span>欢迎使用React</span>
                </p>
                {
                    this.state.modal ? <Modal bg="rgba(122,250,210,.3)" onClose={this.hideModal}>
                            <p>我是Modal组件中的内容</p>
                            <button onClick={this.hideModal}>隐藏</button>
                    </Modal> :null
                }
                <button onClick={this.showModal}>显示</button>
                
            </div>
        )
    }
}