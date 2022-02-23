# plugin

## 作用

loader的功能是转换代码，但是有些情况下，loader难以完成：

- 当webpack生成文件时，顺便多生成一个描述文件
- 当webpack编译启动时，控制台输出一句信息
- 。。。

这种需要将功能嵌入webpack编译流程的操作，需要使用plugin来实现

plugin本质是一个带有apply方法的对象,一般将其做为构造函数

```javascript

    module.exports = function(){
        apply(compiler){ // 类似于window.onload,在此处注册事件
            compiler.hooks.事件名.事件类型(name,function(compilation){
                // 编译处理、生成
                //compi lation也有很多事件
            })
        }
    }
```

compiler对象是在打包初始化阶段构建的，整个webpack打包期间只有一个
apply会在创建好compiler对象后自动调用
compiler有大量的hook,plugin开发时可以注册这些hook，参与编译和生成
