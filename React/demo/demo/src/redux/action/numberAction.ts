import * as actionTypes from "./action-type"
/**
 * 用于增加数字操作的Action
 */
export function getIncreaseAction(){
    return {
        type:actionTypes.Increase
    }
}

export function getDecreaseAction(){
    return {
        type:actionTypes.Decrease
    }
}
export function setNumberAction(val:any){
    return {
        type:actionTypes.SET,
        payload:val
    }
}

