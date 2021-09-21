# global 对象

[toc]

## global 为 nodeJS 的全局对象

它类似于浏览器的 window 对象

+ setTimeout 返回值为对象（浏览器的返回为 number）
+ setInterval
+ setImmediate 立即执行的，功能类似于设置为 0 的 setTimeout
+ console
+ \_\_dirname 当前文件目录路径 非 global 属性
+ \_\_filename 当前文件路径 非 global 属性
+ Buffer
  + 类型化数组，古老的东西
  + 现在继承自 UInt8Array
  + 文件操作及流操作会使用
  + 使用/输出时，可能需要使用 16 进制
+ process 进程
  + cwd() 返回当前 nodejs 进程的工作目录，为绝对路径
  + exit() 强制退出 nodejs 进程
    + 可传入退出码，默认 0 代表正常退出
  + argv 获取命令中所有的参数,返回 string[]
  + platform 获取当前的操作系统，win32指支持32位或以上的api，不是指电脑系统为32位
  + kill(pid) 结束目标进程
  + env 环境变量
  