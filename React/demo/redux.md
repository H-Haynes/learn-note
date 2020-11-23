# Redux

[toc]

## Reducer

一个普通的函数，接受两个参数：
    -state : 仓库中数据之前的状态
    -action: 进行什么操作,表示描述要做什么的对象
该函数返回一个新的状态,若无效可返回原来的数据
约定action格式为:

    {
        type:'操作类型',
        payload:'附加数据'
    }

使用createStore来创建仓库（该函数源自redux库），该函数接受两个参数，一个reduce，一个数据默认值，返回一个仓库对象:
```const store = createStore(reducer,28); //28```

## Action

1.action是一个plainObject平面对象，它的_propto_指向object.protype
2.action中必须拥有type属性，该属性用于描述操作的类型,并且该值可以是任意类型
3.在大型项目中，由于操作类型较多，为了避免硬编码(hard code,即将数据写死,字面量等)，常将action的type存放到一些单独的文件中
4.为了方便创建，常用action创建函数
    1.action创建函数应该为无副作用的纯函数,不能已任何方式改变参数，不能有异步，不能对外部造成数据影响
5.为了方便利用action创建函数来分发action,redux提供了一个```bindActionCreators```,该函数会自动分发参数：
    - actions:创建函数的合并对象,得到一个新对象，新对象的属性名与第一个参数的属性名一致
    - 分发函数:store.dispatch
