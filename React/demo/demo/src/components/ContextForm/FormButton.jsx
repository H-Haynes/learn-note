import React from 'react'
import {Consumer} from "./formContext"
export default function FormButton(props) {
    return (
        <Consumer>
            {
                ctx =>{
                    return (
                        <button onClick={
                            ()=>{
                                ctx.toSubmit()
                            }
                        }>
                            {props.children}
                        </button>
                    )
                }
            }
        </Consumer>
    )
}
