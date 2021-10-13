const Koa = require('koa')
const koaStatic = require("./koa-static-middle");
const path = require("path")
const app = new Koa();

app.use(koaStatic(path.resolve(__dirname,'public')));
app.use((ctx,next)=>{
		ctx.response.status = 200;
		ctx.response.body = {
			success:true,
			message:"",
			data:[
				{
					name:1,
					type:2
				}
			]
		}

		// ctx.throw(403,"no permission")
		next()
})

app.on('error',err=>{
	console.log("error")
})


app.listen(9876,()=>{
	console.log("Koa服务端已启动")
})

