# callbackHook


例：父组件每次重新渲染师，回调函数的地址发生改变，导致子组件也跟着重新渲染

```javascript
    class Comp1 extends React.PureComponent{
        render(){
            return <button onClick={this.props.onClick}>{this.props.sta}</button>
        }
    }

    function Comp(){
        const [sta,setSta] = useState("111");
        const [x,setX] = useState(0)
        return (
          {/* setSta没效果，因为值没变*/}
            <Comp1 sta={sta} onClick={()=>setSta("111")}/>
            {/* 问题：x值改变会导致纯组件Comp1也重新渲染， 纯组件依赖数据看上去没变，实际上渲染时，每次的onClick都不是同一个,优化失效*/}
            <input type="number" value={x} onChange={(e)=>setX(e.target.value)}>
        )
    }
```

`useCallback`用于得到一个==固定引用值==的函数，通常用于性能优化
该函数有两个参数:
1. 函数，会固定该函数的引用，依赖不变则始终返回之前的函数地址
2. 数组，依赖项

```javascript
    const handleClick = useCallback(()=>{
        setSta("someThing")
    })
```

