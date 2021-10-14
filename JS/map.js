//core :链表 hash算法 桶
function myMap() {
    this.bucketLength = 8;
    this.init();
}
myMap.prototype.init = function () {
    //  初始化 桶
    this.bucket = new Array(this.bucketLength);
    for (var i = 0; i < this.bucketLength; i++) {
        this.bucket[i] = {
            type: "bucket_" + i,
            next: null
        }
    }
}
myMap.prototype.makeHash = function (key) {//Hash算法
    let hash = 0;
    //对各种值做hash，一样的值hash不变(重复的值hash不应当改变)
    //string number boolean null undefined NaN {} [] function
    if (typeof key !== "string") {
        if (typeof key === "number") {              //处理number
            hash = Object.is(NaN, key) ? 0 : key;   //处理NaN
        } else if (typeof key === "object") {       //处理null {} 
            hash=1;
        }else if(typeof key==="boolean"){           //处理Boolean
            hash=+key;                               //隐式类型转换
        }else{
            hash=2;     //undefined  function
        }
    } else {
        //string
        //长度大于3则取前3字符ascii累加
        for (let i = 0; i < 3; i++) {
            hash += key[i] ? key[i].charCodeAt(0) : 0;
        }
    }

    return hash % 8;
}

myMap.prototype.set = function (key,value) {
        let hash=this.makeHash(key);
        
        let tempBucket=this.bucket[hash];
        while(tempBucket.next){//如果这个桶的next有了值
                if(tempBucket.next.key===key){//以前就有了
                    tempBucket.next.value=value;
                    return 
                }else{
                    tempBucket=tempBucket.next;
                }
        }
        tempBucket.next={
            key,
            value,
            next:null
        }
}
myMap.prototype.get = function (key) {
    let hash=this.makeHash(key);    //由于同样的值得hash是一样的，可以根据hash找到桶
    let tempBucket=this.bucket[hash];
    while(tempBucket){
        if(tempBucket.key===key){
            return tempBucket.value;             //找到了
        }else{
            tempBucket=tempBucket.next;         //如果不是就查找下一个
        }
    }
    return undefined;//未找到
}
myMap.prototype.delete = function (key) {
    //删除要注意将前一个的next指向被删的next 而当前个就不被任何指向的，无法被访问，相当于删除
    let hash=this.makeHash(key);    
    let tempBucket=this.bucket[hash];
    while(tempBucket.next){
        if(tempBucket.next.key===key){//就是删除当前的值
            tempBucket.next=tempBucket.next.next;//将当前的next指向连到下下个
            return true;
        }else{
            tempBucket=tempBucket.next
        }
    }
    return false
}
myMap.prototype.has = function () {
    let hash=this.makeHash(key);   
    let tempBucket=this.bucket[hash];
    while(tempBucket){
        if(tempBucket.next&&tempBucket.next.key===key){
            return true ;           //找到了
        }else{
            tempBucket=tempBucket.next;         //如果不是就查找下一个
        }
    }
    return false;//未找到
}
myMap.prototype.clear = function () {       //清除等于初始化
    this.init();
}
let mp = new myMap();
mp.set("12", "23");
mp.set(function(){}, "23");