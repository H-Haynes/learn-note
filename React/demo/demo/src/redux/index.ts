import {createStore,bindActionCreators} from "redux"
import * as actionTypes from "./action/action-type"
import * as numberAction from "./action/numberAction"
/**
 * 
 * @param state 仓库中数据之前的状态
 * @param action 描述要做什么操作的对象
 * 约定action格式:{type:'操作类型',payload:'附加数据'}
 */
function reducer(state:any,action:any){
    if(action.type===actionTypes.Increase){
        return state + 1
    }else if(action.type===actionTypes.Decrease){
        return state - 1;
    }else if(action.type==actionTypes.SET){
        return action.payload
    }else{
        return state
    }
}


// const store = createStore(reducer,28);  //28
const store = createStore(reducer);  //28

//改变数据,使用action
// const action = {
//     type:'increase',
// }
// store.dispatch(action)

const action = numberAction.getDecreaseAction;
store.dispatch(action)
store.dispatch(numberAction.setNumberAction(30))

//直接分发
bindActionCreators(numberAction,store.dispatch)

