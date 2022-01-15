# Utility Types 工具类型

用泛型给它传入一个参数，utility type对这个类型进行某种操作

## Parameters

`interface`在大部分情况下是可以与`type`（类型别名）互相转换的，但有些情况不可以：

1. 交叉类型(`&`)、联合类型(`|`)等
2. `interface`无法实现`utility type`

`Parameters<typeof person>`:Parameters能够读出person函数的参数类型

```typescript
    function person(name:string,age:number){}

    const editPerson = ({name,age}:Parameters<typeof person>) =>{

    }
```

## Partial | Omit

类型编辑

```typescript
    type Person { 
        name:string,
        age:number
    }
    const user1:Partial<Person> = {name:"s"}; // 属性变为可选，而非原来的强制
    const user2:Omit<Person,'name'｜'age'> = {}; // 删除属性，Person类型中的name,age属性被删除,多属性删除使用｜
```
