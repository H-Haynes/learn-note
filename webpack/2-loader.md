# loader加载器

## loader是什么

loader是将源代码字符串source code经过一定规则，转换为新的source code
使javascript能处理非js文件，webpack自身智能处理Js文件，loader可以将所有类型的文件转换为webpack能够处理的模块

## loader运行时间

在读取文件内容之后、AST语法抽象之前根据配置规则处理loader，每个文件形成一个loaders数组，将source code经过这一组loaders处理，生成的新的code字符串再交给下一步处理(AST)
即`webpack打包过程`中2-1与2-2之间

## 配置

```javascript

    module.export = {
        mode:'development',
        module:{
            rules:[
                {
                    test:/.css$/, // 匹配规则
                    use:[
                        {
                            loader:"/test-loader", //加载器的路径，运行时会被转为 `require(路径)`
                            options:{

                            }
                        }
                    ], //匹配到后使用的加载器
                    // use:['style-loader','css-loader','less-loader'] ,//另一种写法

                }
            ],
            noParse:new RegExp(), // 是否不解析某些模块,正则或正则数组
        }
    }
```

## 注意点

rules中的规则顺序是自下向上的，就是后写的规则先进行匹配
loader就是一个函数，将源代码字符串处理完后返回，在处理文件时，如图片，设置函数的raw为true,则源代码就不会乱码了，而被转为buffer传入函数

## webpack 5

在webpack 5中，`url-loader`、`file-loader`被`assets loader`取代，该loader有4个模式可选择

## img-loader示例

```javascript
    function loader(sourceCode){
        var {limit = 1000, filename="[contenthash:5].[ext]"} = loaderUtil.getOptions(this);
        //读取options配置
        var content
        if(buffer.byteLength <>= limit){ // 转base64大小判断
            content = getBase64(sourceCode);
        }else{
            content = getFilePath.call(this,buffer,filename)
        }
        return `module.exports=\`${content}\``
    }
    loader.raw = true; //该loader需要使用原始数据
    function getBase64(buffer){
        return "data:image/png;base64,"+buffer.toString('base64')
    }

    function getFilePath(buffer,name){
        var filename = loaderUtil.interpolateName(this,name,{
            content:buffer
        })
        this.emitFile(filename,buffer); // 直接向最终chunk生成文件
        return filename;
    }

    module.exports = loader;
```