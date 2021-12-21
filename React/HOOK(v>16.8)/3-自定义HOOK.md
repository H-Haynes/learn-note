# 自定义HOOK

[toc]

将一些常用的、跨组件的hook进行提取形成一个函数，就是自定义HOOK
自定义Hook因其内部要使用hook功能，也需要按hook规则实现：

1. 以use开头
2. 调用自定义hook时，应在顶层（不能再代码块）

```javascript
    // 获取所有商品
    import {useEffect,useState} from "react"
    export function useAllStudent(){
        const [prodList,setProdList] = useState([]);
        useEffect(()=>{
            (async ()=>{
                let result = await axios.get('allProdList')
                setProdList(res.data);
            })()
        },[])
        return prodList
    }

    // comp

    function Comp(){
        const prodList =  useAllStudent();
        const list = prodList.map(ele=>(<li key={ele.id}>{ele.name}</li>))
        return (
            <ul>
                {list}
            </ul>
        )
    }
```