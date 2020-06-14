#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jun 14 19:31:59 2020

@author: hehong
"""
form random import *
import math
import calendar
roundNum = randint(7,22)


print(0.1+0.2==0.3);

print(math.isclose(0.1+0.2,0.3))

print(roundNum)

if  7 <= roundNum< 10:
    
    print("[7-10)")
    
elif roundNum >= 10 and roundNum < 15:
    
    print("[10,15)")
    
elif roundNum >= 15 and  roundNum < 20:
    
    print("[15-20)")
    
else :
    
    print("[20,22]")

# 闰年判断小程序
year = int(input('请输入年份'))
check_year = calendar.isleap(year)
if check_year:
    print('%s 年是闰年'%(year))
else:
    print('%s年不是闰年'%(year))


# 枚举
names = ["所念皆星河","星河不可及"]
for index,name in enumerate(names):
    print("%d %s"%(index,name))

# zip

ages = [12,244]
print(type(zip(names,ages)))
for index,age in zip(names,ages):
    print("%s%d"%(name,age))

