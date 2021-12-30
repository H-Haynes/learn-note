# RefHook

RefHook用于固定值的引用，用于性能优化(不仅用于元素)
RefHook仅有一个参数，为默认值，返回一个固定的对象`{current:值}`

## 为什么用RefHook?

有下列代码

```javascript
    function Comp(){
        const inputRef = React.createRef();
        return (
            <input ref={inputRef} />
            <button onClick={()=>console.log(inputRef.current.value)}></button>
        )
    }
```
代码中组件发生重新渲染时，`inputRef`每次都是不同的！，因此函数组件应使用useRef替代createRef

```javascript
    const inputRef = useRef();
```

还可以用于值的固定

```javascript
    let timer;
    function Comp(){
        const [x,setX] = useState(10);
        useEffect(()=>{
            if(x === 0) return;
            timer = setTimeout(()=>setX(x-1),1000);
            return () => clearTimeout(timer)
        })

        return (
            <h1>{x}</h1>
        )
    }
```
上述代码中，timer只能被定义至外部，而如果多处使用该组件，一个组件timer被清理，其他组件均会被清理，使用useRef可解决此类问题:

```javascript
    const timerRef = useRef();
    useEffect(()=>{
        if(x === 0) return;
        timerRef.current = setTimeout(()=>setX(x-1),1000);
        return () => clearTimeout(timerRef.current)
    })
```