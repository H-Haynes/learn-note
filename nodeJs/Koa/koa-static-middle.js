const path = require("path")
const fs = require("fs")
const mine = require("mime")
module.exports = async function(root){
	return async function(ctx,next){
		const filename = await getFileName(ctx.path.slice(1,ctx.path.length),root);
		if(!fileName){
			//文件不存在，进入下一个中间件，重要！！！！！
			await next()
		}else{
			ctx.body = await fs.createReadStream(fileName);
			ctx.type= mime.getType(filename);
			ctx.status = 200;
			next();
		}
	}
}


async function getFileName(urlPath,root){
	 const fileName =  path.join(root,urlpath)
	 try{
			const fileInfo = await fs.promises.stat(fileName);
			if(fileInfo.isDirectory()){
				return await	getFileName(path.join(fileName,'index.html'))
			 }else{
					return fileName
				}
		}catch{
			return null
		}
}
