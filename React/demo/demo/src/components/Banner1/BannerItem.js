import React, { Component } from 'react'
import PropTypes from "prop-types"
export default class BannerItem extends Component {
    static propTypes = {
        src:PropTypes.string,
        width:PropTypes.string,
        height:PropTypes.string
    }
    render() {
        return (
            <li style={{width:this.props.width,height:this.props.height,flexShrink:0}}>
                <img src={this.props.src} style={{width:"100%",height:"100%"}}/>
            </li>
        )
    }
}
