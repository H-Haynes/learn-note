import React, { Component } from 'react'
import {Provider} from "./formContext"
import FormInput from "./FormInput"
import FormButton from "./FormButton"
import PropTypes from "prop-types"
export default class Form extends Component {
    state = {
        formData : {
            account:"",
            password:""
        },
        changeFormData:(name,value) => {
            this.setState({
                formData : {
                    ...this.state.formData,
                    [name]:value
                }
            })
        },
        toSubmit:()=>{
            let flag =true;

            for(let prop in this.state.formData){
                if(!this.state.formData[prop]){
                    alert("请输入"+prop)
                    return
                }
            }
            alert('正在提交');
            this.props.onSubmit(this.state.formData);
        }
    }
    static propTypes = {
        onSubmit : PropTypes.func
    }
    render() {
        return (
            <Provider value ={this.state}>
                {this.props.children}
            </Provider>
        )
    }
}
Form.input = FormInput;
Form.button = FormButton;
