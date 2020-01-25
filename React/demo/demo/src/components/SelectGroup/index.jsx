import React, { Component } from 'react'
import PropTypes from "prop-types"
import types from "../../utils/commonTypes"
export default class SelectGroup extends Component {

    static defaultProps = {
        selected:"",
        datas:[]
    }

    static propTypes = {
        name:PropTypes.string.isRequired,
        datas:types.datas.isRequired,
        selected:PropTypes.oneOfType([PropTypes.string,PropTypes.number])
    }

    handleChange= e =>{
        this.props.onChange && this.props.onChange(e.target.value,this.props.name,e)
    }

    getOptions(){
        return this.props.datas.map(ele=>(
            <option key={ele.value} value = {ele.value}>
                {ele.text}
            </option>
        ))
    }

    render() {
        var options = this.getOptions()
        return (

                
                <select onChange={this.handleChange} 
                    value={this.props.selected} 
                    name={this.props.name}
                    >
                    {options}
                </select>

        )
    }
}
