import React, { Component } from 'react'
import SelectGroup from "./index"

export default class SelectGroupTest extends Component {
    state={
        datas:[
            {value:"马东洋",text:"马东洋"},
            {value:"马东阳",text:"马东阳"},
            {value:"马冬梅",text:"马冬梅"},
            {value:"韩梅梅",text:"韩梅梅"}
        ],
        selected:"马冬梅",
        name:"username"
    }
    render() {
        return (
            <div>
                <SelectGroup 
                    {...this.state}
                    onChange={val=>{
                        this.setState({
                            selected:val
                        })
                    }}
                />
            </div>
        )
    }
}
