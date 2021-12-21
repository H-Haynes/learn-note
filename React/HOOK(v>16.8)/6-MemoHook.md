# MemoHook

用于保持一些较为稳定的值(该值可能获得过程较为复杂，又不常改动)，用于性能优化

`useMemo`有两个参数，且返回一个任意值,和`useCallback`极度相似，甚至可替代
1. 函数，该函数返回结果作为useMemo的返回值
2. 数组，依赖项
3. 依赖项不变直接使用之前结果，不再重新计算

```javascript
    const [max,setMax] = useState(1000);
    const count = useMemo(()=>{
        var t = 0
        for(var i = 0 ; i < max; i++){
            t += i;
        }
        return t;
    },[max]);


```