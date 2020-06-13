import React,{useState} from 'react'
import "./index.css"

export default function StateHook() {
    var [val1,setVal] = useState(0)    //使用一个状态，该状态默认值为0
    var [val2,setVal2] = useState(1)
    var [visiable,setVisiable] = useState(false)
    return (
        <div>
            <div>            
                <button onClick={()=>setVal(val1-1)}>-</button>
                <span>{val1}</span> 
                <button onClick={()=>setVal(val1+1)}>+</button>
            </div>
            <div>
                <button onClick={()=>setVal2(val2-1)}>-</button>
                <span>{val2}</span> 
                <button onClick={()=>setVal2(val2+1)}>+</button>
            </div>
            <p>
                <button className="visiable" onClick={()=>setVisiable(!visiable)}>{visiable?"隐藏":"显示"}他们的和</button>
            </p>
            <p style={{
                display:visiable?'block' : 'none'
            }}>他们的和为{val1+val2}</p>
        </div>
    )
}
