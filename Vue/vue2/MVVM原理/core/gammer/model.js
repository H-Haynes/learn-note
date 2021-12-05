import { setValue } from "../util.js"
/**
 * 
 * @param {*} vm 实例
 * @param {*} elm 元素
 * @param {*} data 绑定的数据
 */
export function model(vm,elm,data){
    elm.onchange = function(event){
        setValue(vm.$data,data,elm.value)
    }
}