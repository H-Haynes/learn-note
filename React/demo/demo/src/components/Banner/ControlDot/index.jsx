import React, { Component } from 'react'
import PropTypes from "prop-types"
import "./index.css"
export default class ControlDot extends Component {
    static propTypes = {
        total:PropTypes.number.isRequired,
        currentIndex:PropTypes.number.isRequired,
        onChange:PropTypes.func.isRequired,
        onMouseOut:PropTypes.func
    }

    render() {
        let dotList = [];
        for(let i=0;i<this.props.total;i++){
            dotList.push(
                <li 
                    className={this.props.currentIndex === i ? 'dot-active' : ''} 
                    key={i} 
                    onMouseOver={()=>{
                        this.props.onChange && this.props.onChange(i)
                    }}

                    onMouseOut = {()=>{
                        this.props.onMouseOut && this.props.onMouseOut()
                    }}
                    >

                </li>
            )
        }
        return (
            <ul className="control-dot">
                {dotList}
            </ul>
        )
    }
}
