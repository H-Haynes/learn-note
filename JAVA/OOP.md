# OOP 面向对象

[toc]

## 权限修饰符

+ public
+ 默认
+ pravite
+ protect

## 特征修饰符

## 属性

*权限修饰符 [特征修饰符] 数据类型 属性名 [=属性值]*
权限修饰符有：public private protect
特征修饰符如：final...


## 方法

*权限修饰符 [特征修饰符] 返回值类型 方法名 (参数列表) [抛出异常] [方法体]* 
存储在*堆内存*的对象空间内
执行时在*栈内存*中开辟一块临时方法执行空间

## 实例

Person person = new Person;内存运行过程

在方法区(类)找到Person(映射类)模板
在堆内存中开辟空间,根据Person类模板生成实例
在栈内存开辟空间person，指向将该实例的地址


## 重载 overload

即一个类中的一组方法名相同，参数列表不同的多个方法
调用时先定位方法名，然后根据参数使用相应的方法
如果没有对应的，参数尝试类型转换来找到能用的
如果没有能用的则报错
数组参数列表与动态参数列表不可重载

## 动态参数列表(rest)

在JDK1.5后，支持动态参数列表,【...】0-n个参数
动态参数列表的方法不能与相同意义数组*类型相同*的方法构成重载(包括多维和其他类型)
与数组不同，可以不用传值
```
public void test(int... x){

}
```
本质上就是一个数组

## 构造方法

*权限修饰符 方法名(参数列) [异常] {方法体}*
类的第三种成员，仅有一个，在new时执行，返回类型固定为当前类实例，因此省略返回值类型
无特征修饰符
方法名与类名一致
构造方法可进行重载,并且建议自定义构造函数时，同时重载无参数的构造方法
构造方法重载间不可互相调用（详情在继承）
```

```


## 程序块

类中的第四成员，特殊的方法，无参数，无返回值，无名字，无修饰符
无法手动调用，该代码块在调用构造函数之前自动执行
可以有多个程序块，按顺序执行



## this

如果构造函数重载，在一个构造方法内，可以调用另另一个构造方法，通过```this()```,因为系统认为构造方法的名字必定与类名一致，所以名字也被省略，无法使用```this.类名```来调用
调用另一个构造器必须写在第一行

