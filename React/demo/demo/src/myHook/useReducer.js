import {useState} from "react"

/**
 * 通用reducer函数
 * @param {function} reducer reducer标准参数{state,action}
 * @param {*} initialState 初始状态
 */
export default function useReducer(reducer,initialState){
    const [state, setState] = useState(initialState)
    function dispatch(action){
        const newState = reducer(state,action);
        console.log(`数据改变:${state} => ${newState}`)
        setState(newState)
    }
    return [state,dispatch]
}