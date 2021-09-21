# EventEmitter

[toc]

## 什么是EventEmitter

nodejs的事件管理通用机制

```javascript
    import {EventEmitter} from "events"demo
    const event = new EventEmitter();
    event.on('test',function(){// 事件注册
        console.log('自定义事件被触发')
    })
    event.on('test',function(){// 事件注册
        console.log('自定义事件被触发2')
    })

    event.once("once",()=>console.log('该事件只会触发一次'))

    event.emit('test'); // 事件依次触发
    event.emit('once');
    
```
