# Laravel Blade

[toc]

## 简介

blade是由Laravel提供的非常简单但功能强大的模板引擎，Blade视图不约束使用PHP，其视图文件（模板文件）使用blade.php为扩展名,存放在resource/views目录下

## 使用

### 布局 继承

前端开发经常遇到多个页面的多个部分相同的情况，使用blade可以快速解决这个情况:

    先搭建一个主要布局(假设存放在layouts目录，名为default.blade.php)，将重复部分固定，在不同的地方使用@yeild('模板名')来占位；
    然后创建新的模板，这个作为真正的页面，首先使用@extends('layouts.default'),这样就拥有了上面主布局的内容，然后使用@section('模板名')来对上面yeild同名的地方进行内容的填充.

如果布局相同但是内容不同：

    那么就不必写死了，使用@section(‘模板名’）和@show，示例:
        // layouts/default.blade.php
        @section("test")
            我是演示的内容
        @show

        //myPage.blade.php
        @extends('layouts.default')  
        @section('test')
            我是真的内容
         @stop
    上面在default布局中test部分默认为我是演示的内容,@show让这个内容显示的，而在myPage中，先继承了default,然后重新定义了test部分的模板内容
    注意：extends那里可以使用.也可以使用/，最后不要使用分号，会被当做html的内容

    yeild第一个参数为模板名，第二个参数为默认的内容,可以省略

### 模板中的内容

#### 模板中的变量:

 `<p>{{$test}}</p>`,看上去和部分前端框架一样使用双花括号（如），因此为了区分，其他的框架可以使用@{{变量名}},@符号会被blade删除掉,注意，如果中间是php代码，则会原样输出,**不解析为php**

#### 模板中的php

    `<p>{{time()<p>}}`,time为php中的函数,
    `<p>{{date(Y-m-d H:i:s,time())}}</p>`,

#### 模板中的短语法

    `<p>{{$name or '我是默认'}}</p>` $name有值则$name，否则为 ‘我是默认’

#### 模板中的原样输出

    `<p>@{{$name}}</p>` 不解析php

### @include 包含子视图

将子模板插入到当前页面里面,语法: @include("文件夹名/文件名前缀"),如: @include(test/test)

如果需要传参:**@include(test/test,['变量名'=>'变量值'])**
子视图就能使用同名变量了

### 生成 url

* 通过url()生成url:
    这个在服务端的controller生成一个url，然后在route使用,在页面中的使用是:`<a href="{{url(route中使用的名字)}}"></a>`,因为route中是可以给url取别名的

* 通过action生成:
    他是通过指定的控制器/方法来生成的：
        `<a href="{{控制器名@url名}}"></a>`,控制器还是xxxController

* 使用route生成
  `<a href="route(名字)"></a>`,这个名字是在route文件写好的
