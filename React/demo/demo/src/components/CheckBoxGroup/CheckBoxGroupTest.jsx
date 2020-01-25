import React, { Component } from 'react'
import CheckBoxGroup from "./index"

export default class CheckBoxGroupTest extends Component{
    state = {
        datas: [
            {text:"翔龙十巴掌",value:"翔龙十巴掌"},
            {text:"九阴真经",value:"九阴真经"},
            {text:"天道",value:"天道"},
            {text:"冰心诀",value:"冰心诀"}
        ],
        choose:["天道","九阴真经"],
        name:"book"
    }

    

    render(){
        return (
            <div>
                <CheckBoxGroup 
                {...this.state}
                onChange={newArr => {
                    this.setState({
                        choose:newArr
                    })
                }}
                />
            </div>
        )
    }
}