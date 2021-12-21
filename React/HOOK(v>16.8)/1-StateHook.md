# State Hook *

[toc]

用于在函数组件中使用状态

`useState`函数第一个参数，为状态默认值

该函数返回一个数组，长度一定为2：

- 1为状态的值
- 2为改变该状态的方法

```javascript
    import React,{useState} from "react"
    function Comp(){
        const [loading,setLoading] = useState(false); // 使用状态

        return (
            <button
                onClick={()=>{
                    setLoading(!loading)
                }}>加载
            </button>
        )
    }

```

## 原理

1. 当运行一个函数组件时，
2. 第N次调用useState，检查该节点的状态表格是否存在下标N
   1. 状态表格中无内容
      1. 使用默认值创建状态
      2. 将该状态加入状态表格,下标为N
   2. 状态表格中有值
      1. 忽略默认值
      2. 直接得到状态值


## 注意

1. `useState`最好写在起始位置
2. 严禁出现于代码块(判断、循环),会导致下标错位
3. `useState`返回的函数，引用不变！
4. 如果使用函数改变数据，若与之前的数据完全相等，不会导致数据重新渲染,以优化效率
5. 使用函数改变数据，传入的值==不会和原来的数据进行合并==，而是直接替换，与setState不同
6. 如果要强制刷新组件，
   1. 类组件使用`forceUpdate`，不会运行`shouldComponentUpdate`，
   2. 函数组件使用空对象的`useState`，重新设置空对象值即可，因为空对象并不相等
7. 如果状态之间无必然联系，应分为不同状态，不要合在一起
8. 函数组件中改变状态可能也是异步的，多个状态变化会合并，最后一起该，因此不能信任之前状态，要使用回调，如果要使用之前的状态，尽量用函数

```javascript
    setLoading(()=>loading = false)
```
