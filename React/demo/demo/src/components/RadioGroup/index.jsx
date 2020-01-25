import React, { Component } from 'react'
import PropTypes from "prop-types"
import types from "../../utils/commonTypes.js"
export default class RadioGroup extends Component {

    static defaultProps = {
        datas:[],
        choose:""
    }

    static propTypes = {
        name:PropTypes.string.isRequired,
        choose:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
        datas:types.datas.isRequired
        }


    handleChange= e=>{
        this.props.onChange && this.props.onChange(e.target.value,this.props.name,e)
    }

    getRadios(){
        return this.props.datas.map(ele=>(
            <label key={ele.value}>
                <input 
                    type="radio"
                    value={ele.value}
                    name={this.props.name}
                    checked={this.props.choose == ele.value}
                    onChange={this.handleChange}
                />
                {ele.text}
            </label>
        ))
    }


    render() {
        const radios = this.getRadios()
        return (
            <div>
                {radios}
            </div>
        )
    }
}
