export default{
    proxy:{
        "test":"http://47.113.91.18/test",
        "api":{
            target:"http://47.113.91.18/api",
            changeOrigin:true,
            rewrite:path => path.replace(/^\/api/,'')
        }
    }
}