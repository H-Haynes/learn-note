import fs from "fs"
import path from "path"
const readStream = fs.createReadStream(path.resolve(__dirname,"utils","readDir.js"),{
    encoding:"utf-8",
    start:0,
    end:100,
    highWaterMark:100
});
let chunkData = ""
readStream.on('open',()=>{
    console.log("文件被打开")
}).on('error',err=>{
    console.err("文件读取出错:",err.message)
}).on('close',()=>{
    console.log('文件已关闭');
    
}).on('data',chunk=>{
    console.log("读取中:",chunk)
    chunkData += chunk
}).on('end',()=>{
    console.log("读取完毕")
    console.log(chunkData)
})

const writeStream = fs.createWriteStream(path.resolve(__dirname,"util","test.txt"),{
    flags:"a",
    encoding:"utf-8",
    start:0,
    highWaterMark:1
});

writeStream.on("open",() =>console.log("开始写入"))
            .on("error",()=>console.log("写入出错"))
            .on("end",data=>console.log("写入已结束",data))

const isFull = writeStream.write("hello")
if(isFull){
    console.log("可继续")
    writeStream.write("world")
}else{
    console.log("已满，排队中")
    writeStream.write("!!!")
}



/* 读写配合 */
const file1 = path.resolve(__dirname,"utils","test.txt")

const file2 = path.resolve(__dirname,"utils","test1.txt")

const readStream1 = fs.createReadStream(file1,{
    highWaterMark:1024
})
const writeStream1 = fs.createWriteStream(file2,{
    highWaterMark:512
})

readStream1.on('data',chunk=>{
    const isEmpty = writeStream1.write(chunk);
    if(!isEmpty){
        console.log('暂停读取')
        readStream1.pause();
    }
})

writeStream1.on("drain",()=>{
    readStream1.resume();
    console.log("恢复读取")
}).on("end",()=>{
    writeStream.end()
    console.log("已经复制完毕!")
})
