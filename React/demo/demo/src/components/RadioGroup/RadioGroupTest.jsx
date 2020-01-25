import React, { Component } from 'react'
import RadioGroup from "./index"


export default class RadioGroupTest extends Component {
    state = {
        datas : [
            {text:"男",value:1},
            {text:"女",value:0},
            {text:"胡一菲",value:3}
        ],
        choose:0,
        name:"性别"
    }
    onChange= val =>{
        this.setState({
            choose:val
        })
    }

    render() {
        return (
            <div>
                <RadioGroup 
                    {...this.state}
                    onChange={this.onChange}
                />
            </div>
        )
    }
}
