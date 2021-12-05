const REJECTED = "REJECTED"
const FULFILLED = "FULFILLED"
const PENDING = "PENDING"

interface IExecutor {
    executor:Function|undefined,
    state:"REJECTED"|"FULFILLED"|"PENDING",
    resolve:Function|undefined,
    reject:Function|undefined,
}
/**
 * 把传递的函数放入微队列
 * @param callback 
 */
function runMicroTask(callback){
    //区分环境：web环境/node环境
    if(process && process.nextTick){ // node环境
        process.nextTick(callback)
    }else if(MutationObserver){ //web环境,使用观察器来实现微队列，该观察器会监听元素变化，变化时将回调放入微队列执行
        const span = document.createElement("span");
        const observer = new MutationObserver(callback);
        observer.observe(span, {
            childList: true
        });
        span.innerHTML = "";
    }else{ // 否则使用setTimeout宏队列来模拟
        setTimeout(callback,0)
    }
}

class MyPromise{
    state=PENDING; // 状态
    value=undefined; // 值
    queue:IExecutor[]=[]; // 队列
    constructor(executor){ // 参数
        executor(this.resolve.bind(this),this.reject.bind(this)); //参数是立即执行的
        
    }


    private changeState(state,value){
        if(this.state !== PENDING){
            return; // 状态一经改变，不可修改
        }else{
            this.state = state;
            this.value=value;

            // 状态改变，从对立找到回调
        }
    }

    /**
     * 标记当前任务完成
     * @param value 完成传递的数据
     */
    private resolve(data){
        // 执行then方法
        this.changeState(FULFILLED,data);
        this.then(data);
    }

    /**
     * 标记当前任务失败
     * @param reason 失败的错误信息
     */
    private reject(reason){
        // 执行catch方法
        this.changeState(REJECTED,reason)
    }

    /**
     * Promise A+规范中的then方法
     * 当成功时，返回一个新的Promise对象，并且执行onFulfilled
     * 当失败时，返回一个新的Promise对象，并且执行onRejected
     * 均放入微队列执行
     * @param onFulfilled 成功的回调函数
     * @param onRejected 失败的回调函数
     */
    public then(onFulfilled,onRejected?){
        return new MyPromise((resolve,reject)=>{
            // 向队列添加回调
            this.pushHandler(onFulfilled,FULFILLED,resolve,reject);
            this.pushHandler(onRejected,REJECTED,resolve,reject);
            // 可能状态已经改了，调用下回调
            this.runQueue();
        })
    }

    /**
     * 向队列添加一个回调
     * @param handler 添加什么函数
     * @param state 该函数什么状态下执行
     * @param resolve 让then返回的promise状态为FULFILLED
     * @param reject   让then返回的promise状态为REJECTED
     */
    private pushHandler(handler,state,resolve,reject){
        this.queue.push({
            executor:handler,
            state,
            resolve,
            reject
        })
    }

    /**
     * 根据实际情况执行队列
     */
    private runQueue(){
        if(this.state === PENDING){ // 任务挂起中，不处理
            return;
        }

        while(this.queue[0]){ // 始终运行第一项
            this.runOneHandler(this.queue[0]);
            this.queue.shift(); // 处理完删除掉
        }
    }

    /**
     * 处理一个回调
     */
    private runOneHandler({executor,state,resolve,reject}){
        //处理完将删除该回调
        runMicroTask(()=>{
            if(this.state !== state){ // 状态不一致
                return;
            }

            if(typeof executor !== 'function'){ // 如果不是函数,无效参数、无参数
                this.state == FULFILLED ?resolve(this.value) : reject(this.value); //状态统一
            }else{ // 执行该回调
                try{
                    const result = executor(this.value); // 执行回调
                    if(this.isPromise(result)){ // 如果返回的是promise对象
                        result.then(resolve,reject); // 则继续执行\
                    }else{
                        resolve(result); // 否则直接返回
                    }
                }catch(error){
                    reject(error)
                }
            }
        })
    }

    /**
     * promise A+ 规范的判断promise方法
     * @param obj 
     * @returns 
     */
    private isPromise(obj):boolean{
        return !!(obj && typeof obj === 'object' && typeof obj.then === 'function');
    }
}


const promise = new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("hello")
    },1000)
})

