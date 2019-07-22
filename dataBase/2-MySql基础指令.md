# MySql基础命令

[toc]

## 基础

* `show databases ;`  显示所有数据库
* `use mysql;`    连接到名为mysql的数据库
* `show tables;`  显示所有的表
* `desc db;` 显示名为db的表
* `show create table db ;`显示db表的创建语句
* `select * from db;` 显示db表里面的所有内容(数据库庞大请慎用)
* `create database myFristSql;`创建名为myFirstSql的数据库
* 新建table时约定设置主键(在columns里面),主键必须是唯一的、无任何含义的，defalut的comment约定必须写，用来描述当前字段的作用,  仅主键可使用auto inc项
* `alter database test character set utf8;`修改test库的编码
* `alter table stu default character set utf8`    修改stu表的编码
* `alter table stu convert to character set utf8`修改stu表所有字段的编码
* `ALTER TABLE table_name DROP COLUMN field_name`删除table_name表中的field_name字段
  
### 增删改查

* `insert into student (num,age,name,class) values (1024,17,"陈凡",14)` 向student表新增一条数据，包含num,age,name,class属性和值

* `update student set class=15 where num=1024;`修改num=1024这条数据的class值为15
* `update student set class=15,age=14 where num=1024;`  修改多条数据
* `select name from student where age=18` 查询student表中age为18的所有人的名字
* `select count(1) from student`    查询student表所有人数
* `select count(1) from student where age>18`查询student表中age>18的人数,多个条件用and/or连接
* `select sum(age) from student` 计算所有人员年龄总和
* `select avg(age) from student`求所有人age平均数
* `select avg(age) as avg_age from student` 求平均age并设置显示的名（最后显示的是avg_age，对原数据库无影响,仅做显示）
* `select count(1) from student group by class`对student以class分组，并分别统计每组人数
* `select class,count(1) from student group by class`  在上面的基础上显示class，**注意：前面只加以什么分组的属性**,这里以 class分组，就只能写 class
* `select * from student limit 2,7` 分页,从第2条开始，最多显示7条
* `select * from student order by id`使用id对student表正向排序
* `select * from student order by id desc`倒序排列
* `select * from student order by id desc limit 2,7`倒序排列,并分页
* `delete from student where name="陈凡"`删除name为陈凡的数据
  