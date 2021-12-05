import {initMixin} from "./init.js"
import {renderMixin} from "./render.js"
function Due (options){ //Due构造函数
    this._init(options);
    this._render()
}
initMixin(Due)
renderMixin(Due)

export default Due