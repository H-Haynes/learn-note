import React, { Component } from 'react'
import PropTypes from "prop-types"


const ctx = React.createContext({       //上下文默认值
    a:123,
    b:"fff"
})
export default class NewContext extends Component {
    state = {
        a:456
    }
    static contextType = ctx;   //关联
    render() {
        const Provider = ctx.Provider;

        return (
            <ctx.Provider value={()=>{
                a:this.state.a
            }}>
                <div>
                    <Child />
                    <button onClick = {()=>{
                        this.setState({
                            a:789
                        })
                        
                    }}></button>
                </div>
            </ctx.Provider>
        )
    }
}
