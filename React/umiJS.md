# umiJS

umiJS是一套开箱即用的react快速工程工具

## 开始

安装`yarn create @umijs/umi-app`
无需再安装react,react-router等

## 约定式路由

使用约定好的文件夹和文件来代表页面，umi会根据书写的页面生成路由配置

约定：

1. 工程中的`pages`文件夹存放的就是页面，若src下有pages目录，则`src/pages`即为页面文件夹
2. 页面的文件名以及页面的文件路径是该页面匹配的路由(`pages/a.jsx`,访问则为`"/a"`),有子文件夹则视为子路由
3. 如果页面的文件名为index，则为默认页，如首页;避免文件名与子文件夹名称重名
4. 如果src/layouts目录存在，则该目录中index.js表示全局通用布局，布局中的children会添加具体页面
5. 如果pages文件夹包含layout.js,则layout.js所在目录及其所有子目录中的页面公用该布局
6. 若pages/404.js存在，则无匹配路由时，默认渲染该页面

## 配置式路由

直接书写路由配置文件,在`.umirc.ts`中设置routes属性,或`config/config.js`中书写路由配置
当书写了配置式路由，约定式路由将会失效


## 路由跳转

1. 在umi中可引入Link/NavLink组件，使用组件跳转
2. 在umi中可引入Router，使用Router API
3. 在props可接收到路由信息，使用路由信息提供的API跳转

## dva

基本上所有umi项目开发，都会使用到dva，要开启dva需安装`umi-plugin-react`插件，并在`umirc.ts`中设置

```javascript
    //umirc.ts
    export default defineConfig({
        plugins:[
            ["umi-plugin-react",{
                dva:true,
                script:[], // 一些外部的js（像webpack external）或代码字符串，

            }]
        ]
    })
```
