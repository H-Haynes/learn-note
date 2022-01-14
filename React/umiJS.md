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

路由中的routes属性是一个数组，每一项是一个组件路径，路径相对于项目根目录，当匹配到路由后，会转而渲染对应组件，并将component属性的组件作为children放到匹配的组件中(可做导航守卫/中间件等功能)

```javascript
        {
            path:"/",
            component:"../layouts/index.tsx",
            routes:["./pages/user.jsx","./pages/isLogin.tsx"], 
            // component会作为children传入到a\b组件
        }

        // isLogin.tsx

        export default isLogin(props){
            if(localStorage.getItem('user')){
                return props.children
            }else{
                return (<h1>请登录</h1>)
            }
        }
```

配置路由中的信息，同样可以放到约定式路由中：
为约定式路由文件中头部添加YAML文档注释

```javascript
    /**
    * title: 首页
    * Routes: 
    *   - ./routes/HandleLogin.tsx
    *   - ./routes/HandleUserInfo.tsx
    */

    // 上面的配置将会在umirc中生成对应的路由配置
    export default function Index(){

    }

```

```javascript
    //嵌套路由
    export default defineConfig({
        routes:[
            {
                path:"/",
                component:"../layouts/index.tsx",
                routes:["./pages/a.jsx","./pages/b.tsx"], // 直接写组件路径的
                routes:[
                    {
                        exact:true, // 若不设置该项，会自动添加并设置为true
                        path:"/",
                        component:"./" ,// 相对于pages文件夹的文件路径
                        title:"",//自定义属性，在组件中可使用props获取
                    }
                ]
            }

        ]
    })
```

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
                script:[{src:"./a.js"}], // 一些外部的js（像webpack external）或代码字符串，
                immer:true, //开启immer后可在reducer直接对state进行语法操作,immersible,语法糖，实际也没对原状态进行操作
            }]
        ]
    })
```

dva插件与umi整合后，模型分为全局模型和局部模型，全局模型所有页面通用，工程启动后，模型就挂载到仓库

### 全局模型

在```src/models```目录定义的js都被视为全局模型，文件名既模型名

```javascript
    // src/models/stu.js
    export default {
        state:{
            total:47,
            datas:[]
        }
    }
```

### 局部模型

在`pages`文件夹或其子文件夹`models`下的js文件被视为局部模型，局部模型被该页面及子页面及祖先页面共享共享、
单文件模型：使用model.js文件创建模型不在models文件夹,（也会被解析到路由，但因不是组件，访问会解析失败,umirc设置routes的exclude进行排除）

## 数据模拟

mock文件夹下所有文件及pages文件夹下_mock.js文件会被umi解析，截获ajax请求


## 配置

`src/pages/document.ejs`: 自定义页面模板
`src/global.js`: 全局js，项目启动后执行
`src/app.js`：作为运行时配置的代码，使用动态配置时可能使用
    - pathRoutes 动态路由函数

`.env`:环境变量
    - MOCK:是否使用mock数据`none`为关闭
    - UMI_ENV:影响umirc.js,umi的环境变量值，可以为任意值,之后新建`.umirc.值.js`文件就会生效，优先级比`.umirc.js`高,两个文件都会生效
  
`.umirc.js`:
    - routes: 配置后约定式路由失效
    - history: 路由模式，默认history,可选`hash`
    - outputpath:打包目录，默认`./dist`
    - publicPath:静态资源目录
    - exportStatic:开启后会打包多个静态页面，每个页面对应一个路由，前提不能有动态路由

## cli

`yarn create-umi`