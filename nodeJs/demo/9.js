// console.log(global);
import path from "path"
import os from "os"
import URL from "url"
import util from "util"
console.log(process.argv)
console.log("行分隔符:",os.EOL)
console.log("架构:",os.arch())
console.log("CPU信息",os.cpus());
console.log("剩余内存",os.freemem()/(1024 * 1024) +'G');
console.log("用户路径:",os.homedir())
console.log("主机名:",os.hostname())
console.log("系统临时路径:",os.tmpdir())

console.log("basename:",path.basename("./modulea.mjs",'.mjs'));

const url = new URL("https://baidu.cn")
console.log(url.hostname);

async function delay(){
    return new Promise(resolve=>{
        setTimeout(()=>resolve(),40)
    })
}

delay().then(()=>{
    console.log('aaa')
})

const delayCb = util.callbackify(delay);
delayCb(function(err,d){
    console.log(d)
})