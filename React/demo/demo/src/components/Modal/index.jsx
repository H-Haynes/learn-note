import React, { Component } from 'react'
import "./index.css"
import PropTypes from "prop-types"

Modal.defaultProps = {
    bg:"rgba(0,0,0,.5)",
    width:"30%",
    height:300
}

Modal.propTypes = {
    children : PropTypes.node,
    width:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    height:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    bg:PropTypes.string,
    onClose : PropTypes.func.isRequired
}


export default function Modal(props){
    
    return (
        <div className="modal" onClick={e=>{

                if(e.target.className == 'modal'){
                    props.onClose()
                }
            }
        } style={{
            background:props.bg
        }}>
            <div  className="modal-box" style={{
                width:props.width,
                height:props.height
            }}>
                {props.children}

            </div>
        </div>
    )
}