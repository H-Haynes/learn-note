# ImperativeHook

用于在 ref 时自定义暴露给父组件的实例值

若不给依赖项，则每次运行函数组件都会运行
若使用依赖项，则该函数第一次调用后会缓存，依赖项发生变化时才重新调用

`useImperativeHandle` 应当与 `forwardRef` 一起使用：

```javascript
    function FancyInput(props, ref) {
    const inputRef = useRef();
    useImperativeHandle(ref, () => ({
        focus: () => {
        inputRef.current.focus();
        }
    }));
    return <input ref={inputRef} ... />;
    }
    FancyInput = forwardRef(FancyInput);
```

父组件可以调用 `inputRef.current.focus()`。



