#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Jun 13 16:03:23 2020

@author: hehong
78"""

# -*- 单层缩进 -*-

flag = False
name = 'lesson-1'
if name == 'lesson-1':
    flag = True
    print("欢迎来到第一节")
else:
    print('你进错了课堂')
    
# 单行注释
'''
    多行注释
'''

# 内建函数type查看类型
print(type(name))
print(type(None))

print(help(name))
# 内建函数help
print(help(None))

# 数字类型

a = 3
b=2.2
c=4.153e4+4j
print(a,b,c)
# a的b次方
print(pow(a,pow(a,b)))
# 复数类型
print(type(c))
#内建函数 id
print(id(name)) 
# 获取实部
print(c.real)
# 获取虚部
print(c.imag)
# 整商
print(100//3)
# 非整商
print(100/3)
#元祖
print(divmod(3,2.2))


# 输入函数
print(16+int(input("请输入16+？")))
#格式化输出
print('我叫 %s,今年 %d 岁'%(name,a))
print('我叫',input('名字'),'今年',input('年龄'),'岁')

for p in "你の名字":
    print(p)
    
print("欢迎来到王者荣耀".ljust(20))
print("欢迎来到王者荣耀".rjust(20))

# format
"{3}{1}{2}{0}".format("this","is","a","pen");
# 结果为: pen is a this
 