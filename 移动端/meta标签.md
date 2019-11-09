# Meta标签的一些作用

[toc]

在平时开发时，最多的就是用来设置编码格式，如果是h5，还用来设置视口，针对SEO可能还设置一些关键字，内容等信息，但是还有较多的不常使用的东西

## 设置编码格式

    <meta charset="utf-8">

## 设置视口

    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">

## 设置网页描述（SEO优化，重要）

    <meta name="description" content="网页描述的内容">

## 设置网页关键词（SEO优化，重要）

    <meta name="keyword" content="网页的关键词">

## 禁止识别电话与邮箱（但是邮箱无效）

    <meta name="format-detection" content="telephone=no,email=no>

## 设置添加到主屏后的标题(ios)

    <meta name="apple-mobile-web-title" content="我是标题">

## 设置添加到主屏幕后，全屏显示，删除苹果默认的工具栏和菜单栏（无效）

    <meta name="apple-mobile-web-app-capable" content="yes">

## 设置添加到主屏的logo

    <link rel="apple-touch-icon-precomposed" href="图片地址"/>

## 设置桌面启动时的画面(无效)

    <link rel = "apple-touch-startup-image" href="图片地址"/>

## 设置X5内核浏览器仅能竖屏浏览(仅UC有效)

    <meta name="x5-orientation" content="portrait">

## 设置X5内核浏览器全屏浏览

    <meta name="x5-fullscreen" content="true">

## 设置UC浏览器只能竖屏浏览

    <meta name="screen-orientation" content="portrait">

## 设置UC浏览器全屏浏览

    <meta name="full-screen" content="true">
