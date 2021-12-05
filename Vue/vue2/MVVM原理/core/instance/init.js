
import {constructProxy} from "./proxy.js"
import {mount} from "./mount.js"
let uid = 0; // 虚拟domId
export function initMixin(Due){ //初始化函数
    Due.prototype._init = function(options){
        const vm = this; // 构建虚拟dom
        vm.uid = uid ++; 
        vm.$isDue = true; // 添加vue标记
        //初始化data
        if(options && options.data){
            vm.$data = constructProxy(vm,options.data,""); // 代理data
        }

        //初始化created

        //初始化method

        //初始化 computed

        //初始化el并挂载
        if(options && options.el){
            let rootDom = document.querySelector(options.el);
            mount(vm,rootDom);
        }
    }
}

// export default Due