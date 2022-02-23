# cli脚手架制作记录

## 准备工作

1. 新建工程，并初始化`npm init`
2. 安装会使用到的库
   + `commander`:命令行工具库
   + `chalk`: 命令行彩色输出库(version<5)
   + `inquirer`: 用户交互库
   + `handlebars`: 渲染引擎库
   + `log-symbols`: 终端图标库 (version<5)
   + `ora`: 加载状态库

## 制作

创建`bin`目录，`bin`目录下新建`index.js`文件

   1. 文件头部书写`!/usr/bin/env node`,意为指定我们的脚本执行所需要的解释程序，此处使用env找到node,使用node作为解释程序
   2. 在`bin/index.js`书写代码

在`package.json`配置命令及入口

   ```json
    "bin": {
        "mycli": "index.js"
    }
   ```

将包link到本地，然后执行测试`npm link`, `mycli -v`
