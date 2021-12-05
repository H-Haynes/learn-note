export function getValue(obj,name){
    if(!obj){
        return obj
    }
    let nameList = name.split("."); // a.b.c.d
    let temp = obj;
    for(let i = 0; i< nameList.length;i++){
        
        if(temp[nameList[i]] != null){
            temp = temp[nameList[i]]
        }else{
            return undefined
        }
    }
    return temp
}


export function setValue(obj,data,value){
    console.log("in")
    if(!obj){
        return;
    }
    let attrList = data.split(',');
    let temp = obj;
    for(var i =0;i<attrList.length-1;i++){ // 最后一层是值，不进行到最后一层
        if(temp[attrList[i]]){
            console.log(temp[attrList[i]])
            temp = temp[attrList[i]];
            return;
        }else{
            return; // 进行不下去了
        }
    }
    if(temp[attrList[attrList.length - 1]] != null){
        temp[attrList[attrList.length - 1]] = value;
    }
}