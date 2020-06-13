import React, { Component } from 'react'
import PropTypes from "prop-types"
import formContext from "./formContext"

export default class FormInput extends Component {
    static contextType = formContext
    static defaultProps = {
        type:'text'
    }
    static propTypes = {
        name:PropTypes.string.isRequired,
        type:PropTypes.string.isRequired,
        placeholder:PropTypes.string,
        label : PropTypes.string
    }
    render() {
        return (
            <label className="form-context-label" style={{display:'block'}}>
                {this.props.label? this.props.label+":" : null}
                <input 
                    type={this.props.type} 
                    placeholder={this.props.placeholder || null}  
                    value ={this.context.formData[this.props.name]} 
                    onChange = {(e)=>{
                        this.context.changeFormData(this.props.name,e.target.value)
                    }}
                />
            </label>
        )
    }
}
