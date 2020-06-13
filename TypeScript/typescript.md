# Typescript

[typescript]

## 安装

	```npm i -g typescript```
	
## 编译

	```tsc index.ts```
	
## 注意事项

默认情况下，TS会作出以下假设
1.假设你当前环境为node
2.如果代码中未使用模块化，便认为该代码是全局执行
3.编译的目标代码是ES3

### 如何更改假设
1.使用TS命令行时加上选项，如:
2.使用配置文件更改编译选项:
	```tsc --init```初始化ts目录，生成配置文件夹,在配置文件中该设置编译选项
	使用配置文件后，编译时不能跟上文件名，如果跟上会忽略配置文件
	

### 第三方

+ @types/node
	是一个官方的类型库，其中包含了很多对JS代码的类型描述,可以对使用js编写的文件进行类型检查,如@types/jquery
	
+ ts-node
	将TS代码在内存中完成编译 ，同时完成运行 ```ts-node src/index.js```,即使带上文件也会使用配置文件完成编译，并且不会生成dist目录
	
+ nodemon
	监测文件变化，可以做到实时更新 ```nodemon -e --exec ts-node  src/index.ts```
	如果不加e会监测所有文件，包括配置文件,不加src会监测所有文件
	只监测src下的ts则:```nodemon --watch src -e  ts --exec ts-node src/index.ts```
	可在package.json配置这些命令简化输入