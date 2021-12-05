# MVVM与MVC


## MVC

Model View Controller
M表示程序核心，如数据库
V表示显示效果，如HTML
C业务逻辑控制，处理输入

view和model不直接通信，mvc是单向通信view和model必须经过controller

## MVVM

Model-View-ViewModel,实质是MVC的改进版，解决了MVC中大量DOM操作带来的页面渲染性能降低，加载速度变慢等问题。
MVVM中视图与模型不直接通信，只能通过viewModel进行通信(虚拟dom),它能够监听到数据的变化，然后通知视图进行更新，用户操作视图时，viewModel也能够监听到，实现了数据的双向绑定

view可以独立于model变化和修改，一个viewModel可以绑定到不同的view上，view变化时model可以不变，反之也是
重用性较高 (组件式开发等)
MVVM通过数据来显示视图层，而非节点操作，更像是数据驱动视图

