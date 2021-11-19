# webpack打包过程

## 过程

1. 读取配置，默认为`webpack.config.js`,与默认配置进行融合,形成最终配置对象，依赖于`yargs`第三方库，用于融合配置

2. 编译

      1. 生成`chunk`,一个块，根据入口查找依赖，相关的依赖形成一个chunk,chunk是webpack内部产生的东西，最终不会出现于打包结果，chunk名称默认为`main`,ID在开发环境为入口name,生产环境为数字,入口文件是可以有多个的，所以chunk也是可以有多个的

      2. 根据入口构建所有依赖,递归查找依赖模块，用模块路径做模块的key，生成一张依赖表，后面使用依赖时从表格取缓存，不用每次都重复加载

         加载模块**(不运行)**,根据模块id查找，如果该模块没加载，就读取：

         1. 如果依赖表没有该模块，将依赖内容读取出来(字符串)

         2. 进行语法分析，将内容转为`AST`

         3. 树形结构遍历`AST`找到所有依赖

         4. 将依赖记录到`dependenies`数组，(将模块路径放数组里)

         5. 替换依赖函数，将`require`改为`__webpack_require`,依赖函数参数改为模块id(转换后的代码，依然是一个字符串)

         6. 将转换后的代码、模块id记录到依赖表,类似于:

            ```javascript
            "./src/index.js":"_webpack_require('a.js')"
            // 模块ID : 转换后的代码

      3. webpack会根据配置文件为chunk生成一个资源列表`chunk assets`,即为最终要生成的文件名和文件内容(文件列表)，每一个chunk assets即一个`bundle`将上面的转换后的AST代码转为:

         ```javascript
         // 文件名  文件内容
         './dist/main.js': (function(modules){
           
         })({
           './src/index.js':function(xxx){
             	__webpack_require('./src/b.js');
             	__webpack_require('./src/c.js');
           }
         })
         
         './dist/main.js.map':`xxxx`
         './dist/main.min.js':`xxx`
         // 所以说是列表，因为可能根据一个chunk生成多个文件
         
         
         // chunk HASH
         // 将任意长度字符串转为固定长度字符串，相同的字符串生成的结果也相同
         // 可以根据此判断文件是否发生变化
         ```

      		4.  合并`chunk assets`,将所有chunk 合并成一个`总chunk assets`,生成HASH，

3. 输出(`emit`)。webpack利用`fs`模块，根据变异产生的`总asset`生成对应的文件





```javascript
// 相关术语
{
  module:'模块，分割代码的单元，webpack中的模块可以是任意内容的文件，不仅限于js',
  chunk: 'webapack内部构件模块的块，一个chunk中包含多个模块，这些模块是从入口模块，通过依赖分析得来的',
  bundle:'chunk构建好模块后会生成chunk的资源清单，清单中的每一项就是一个bundle,可认为bundle就是最终生成的文件',
  hash: '最终资源清单所有内容联合生成的hash值',
  chunkhash:'chunk生成的资源清单内容联合生成的hash值',
  chunkname: 'chunk的名称，如果没有配置则使用main',
  id: '通常指chunk唯一编号，开发环境和chunkname一致，生产环境为从0开始的数字'
}
```

