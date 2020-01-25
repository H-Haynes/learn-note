import React from 'react'
import "./index.css"
import PropTypes from "prop-types"
import types from "../../utils/commonTypes"
Grail.defaultPoprs = {
        leftWidth:200,
        rightWidth:200,
        minWidth:800,
        height:500,
}

Grail.propTypes = {
    leftWidth:PropTypes.number,
    rightWidth:PropTypes.number,
    minWidth:PropTypes.number,
    height:PropTypes.number,
    children:PropTypes.node,
    left:PropTypes.node,
    right:PropTypes.node
}

export default function Grail(props){


    return (
        <div className="grail" style={{
            height:props.height,
            minWidth: props.minWidth
        }}>
            
            <div className="grail-main" >{props.children}</div>
            <div className="grail-left" style={{width:props.leftWidth}}>{props.left}</div>
            <div className="grail-right" style={{width:props.rightWidth}}>{props.right}</div>
        </div>
        
    )
}