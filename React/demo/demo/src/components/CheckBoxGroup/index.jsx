import React, { Component } from 'react'
import PropTypes from "prop-types"
import types from "../../utils/commonTypes"

/**
 * 多选框组
 */
export default class checkBoxGroup extends Component {

    static defaultProps = {
        datas : [],
        choose:[]
    }

    static propTypes = {
        datas:types.datas.isRequired,
        choose:PropTypes.arrayOf(PropTypes.oneOf([PropTypes.number,PropTypes.string])),
        name:PropTypes.string.isRequired
    }

    handleChange = e=>{
        let newArr;
        if(e.target.checked){//选中
            newArr = [...this.props.choose,e.target.value]
        }else{
            newArr = this.props.choose.filter(ele=>ele !== e.target.value)
        }
        this.props.onChange && this.props.onChange(newArr,this.props.name,e)
    }
    /**
     * 的到一组多选框
     */
    getCheckBoxes(){
        return  this.props.datas.map(ele=>(
            <label key={ele.value}>
                <input 
                    type="checkbox" 
                    name ={this.props.name} 
                    value={ele.value} 
                    checked={this.props.choose.includes(ele.value)}
                    onChange={this.handleChange}

                    />
                {ele.text}
            </label>
        ));

    }
    render() {
        const group = this.getCheckBoxes()
        return (
            <div  >
                {group}
            </div>
        )
    }
}
