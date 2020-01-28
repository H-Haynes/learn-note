import React, { Component } from 'react'
import PropTypes from "prop-types"
import "./index.css"
export default class ControlButton extends Component {

    static propTypes = {
        onChange : PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="control-button">
                <span className="left-btn" onClick = {()=>{
                    this.props.onChange && this.props.onChange('prev')
                }}>&lt;</span>
                <span className="right-btn" onClick={()=>{
                    this.props.onChange && this.props.onChange('next')
                }}>&gt;</span>
            </div>
        )
    }
}
