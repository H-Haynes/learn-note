import http from "http"
import path from "path"
import fs from "fs"
const __dirname = path.resolve();
import URL from "url"
const staticDir = path.resolve(__dirname,"public")
const server = http.createServer( async (req,res)=>{
    const urlObj = URL.parse(req.url)
    const assetPath = path.join(staticDir,urlObj.pathname);

    const filepath = await getAssetsPath(assetPath)
    
    if(!filepath){
        // res.statusCode=404;
        res.write('404 not found')
        res.end()
    }else{
        const rs = fs.createReadStream(filepath);
        rs.pipe(res)
        rs.on('end',()=>{
            console.log("读取完毕")
            res.end()
        })
    }
})


async function isExist(filepath){
    try{
        return await fs.promises.stat(filepath)
    }catch{
        return false
    }
}

async function getAssetsPath(url){
   console.log(url)
    const exist = await isExist(url)
    if(!exist){
        return null
    }else if(exist.isDirectory()){
        return getAssetsPath(path.join(url,'index.html'))
    }else{
        return url
    }
}

server.listen(8191)

