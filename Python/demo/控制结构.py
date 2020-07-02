#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jun 14 19:31:59 2020

@author: hehong
"""
from random import *
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

# 自己实现判断闰年

if not year%100:
    if not year%400:
        print(year,'是闰年')
    else:
        print(year,'不是闰年')
elif not year%4:
    print(year,"是闰年")
else:
    print(year,'不是闰年')


# 枚举
names = ["所念皆星河","星河不可及"]
for index,name in enumerate(names):
    print("%d %s"%(index,name))

# zip

ages = [12,244]
print(type(zip(names,ages)))
for index,age in zip(names,ages):
    print("%s%d"%(name,age))


# 蒙特卡罗
    
import time
DARTS = 10000
hits = 0.0
start=time.time()
for i in range(1, DARTS+1):
    x,y = random(),random()
    dist = pow(x**2+y**2,0.5)
    if dist<=1.0:
        hits = hits+1

pi = 4*(hits/DARTS)
end = time.time()
print("PI是{}".format(pi))
print('运行时间为:%.5f'%(end-start))


# 异常

# 函数
def sum(a,b):
    print(a+b)
sum(23,89)


def sum1(a,*b):
    temp = a
    for x in list(b):
        temp+=x
    print(temp)
    
sum1(4,5,6,7,8,9)






