# ContextHook

用于获取上下文

使用ctx.provider嵌套对组件结构不太友好，所以使用contextHook

```javascript
    const ctx = React.createContext("hello")
    function Comp(){
        const context = useContext(ctx);
        return (
            <h1>{context}</h1>
        )
    }
```