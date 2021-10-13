# 起步

[toc]

## 手动搭建

1. 安装核心库 egg
2. 安装egg 命令行工具 egg-bin



## ## app



### Controller




### router

router根据koa.router实现，需要配合Controller
支持动态路由，路由命名(类似vue-router)

重定向:router.redirect("访问路径","重定向的路径或controller")

Router.resourecs是restful风格的快捷方式，在对应的controller写对应的方法，客户端调用符合风格的API，就会自动使用对应的controller的方法




## Config

#### plugin

要使用的插件，需要在`plugin.js`注册，并开启，但是如果要对插件进行设置，需要在`config.default`去设置

## TypeScript

使用typescript创建项目，运行命令：`npm init egg --type=ts`

