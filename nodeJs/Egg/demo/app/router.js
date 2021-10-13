module.exports = app=>{
	const {router,controller} = app;
	router.get("/",controller.home.index);
	router.get("路由名字，类似于vue-router")
}
