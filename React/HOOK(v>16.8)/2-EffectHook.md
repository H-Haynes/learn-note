# Effect Hook

用于处理函数组件副作用

useEffect接收函数为参数，即需要进行副作用的操作

```javascript
    import {useState,useEffect} from "react"
    function Comp(){
        const [count,setCount] = useState(0);
        useEffect(()=>{
            document.title = '计数器' + count;
        })

        return (
            <button onClick={()=>{
                setCount(()=>count + 1);
            }}>增加</button>
        )
    }

```

1. 该函数运行于页面完成真实ui渲染后，因此是异步的，不会阻塞浏览器
2. 与类组件componentDidUpdate/componentDidMount区别：
   1. 两个生命周期更改了真实DOM但用户未看到更新时运行
   2. useEffect是更改了dom并用户看到更新才运行
3. 可多次使用effect，但不要放入代码块，hook几乎都禁止，缘由一样，会导致下标不准
4. useEffect的副作用函数可以有返回值，返回值必须为函数，用于清理，运行于每次运行副作用函数前，首次渲染不执行,==组件被销毁时一定会运行==
   1. 比如副作用函数赋值了一个定时器，在定时器运行期间，组件被销毁，那么定时器仍然被存在，使用返回值可清理
5. useEffect可传第二参数，为数组
   1. 数组中记录副作用依赖的数据
   2. 传递依赖数据后，组件重新渲染后只要依赖数据与上次不同时，才执行
   3. 无变化则==副作用函数==仅在第一次渲染后执行
   4. 无变化==清理函数==也仅在卸载时执行
   5. 如果依赖为空数组，则无依赖，仅在第一次渲染运行
6. 副作用函数组，如果使用了函数上下文中的变量，则因闭包导致副作用函数组的变量不会实时变化
7. 副作用函数在每次注册时，会覆盖掉之前的副作用函数，因此应尽量保持副作用函数稳定

```javascript
    var timer = null;
    useEffect(()=>{
        setTimeout(()=>{

        },0)
        const stop = ()=>{
            clearTimeout(timer)
        }

        return stop;
    },[props.name,props.age])

```
