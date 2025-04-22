### Python常用输入：

一、单个数字输入 

```python
#Python输入数据主要通过input()函数实现，input()会读取控制台一行的输入，如果输入有多行的话，需要多次使用input()。
a = input()
# a = '1 2 3 4 5'
```

二、输入多个数据

```python
#与Python2中不同，Python3中的input()会将接受的数据返回为一个string类型，如果一行中有多个数据的话，则需要使用split()进行切割。split()切割后返回一个列表。
# 输入为： 1 2 3 4 5
a = input().split() # split()默认以空字符为分隔符，包括空格、换行(\n)、制表符(\t)等
# a = ['1', '2', '3', '4', '5']
	  
# 输入为：1,2,3,4,5
b = input().split(',') # 以逗号为分隔符
# b = ['1', '2', '3', '4', '5']
```

三、

```python
#因为input()返回的是string，分割后也是一个字符列表，如果输入数据是数字则需要进行类型转换。可以单个转换或是用列表批量转换，或者是使用map()并行转换。map()函数返回的是一个迭代器，不能改变值，如果需要改变值的话还需要转换成列表
# 输入为： 1 
a = int(input()) # 单个转换
# 输入为：1 2 3 4 5
b = input().split() # b = ['1', '2', '3', '4', '5']
c = [int(i) for i in b] # 使用列表进行批量转换 c = [1, 2, 3, 4, 5]
d = [int(i) for i in input().split()] # 当然可以一步倒位
# 使用map进行并行转换
e = map(int, input().split()) # 此时e是一个map迭代器，不能赋值，也不能索引
f = list(e) # 转换为列表，e = [1, 2, 3, 4, 5]
g = list(map(int, input().split())) # 一步到位
```

---

##### 四：多行输入：等价于C++的while(scanf()  != -1):

```python
while True:
	  try:
	      data = input()
	      solve(data) # 核心函数
	  except:
	      break
```

---



### Python常用输出：

```python
# Python3的输出主要靠print()函数，就是把结果打印至终端。需要对print()函数的sep和end两个参数有一定的了解

#  情况1: 输出单个数字:
#  输出 a (a = 1)
print(a)

#  情况2: 输出多个数字，同时要求以分隔符隔开
# 输出 a=1, b=2, c=3
print(a, b, c) # print默认以空格为分隔符
# output：1 2 3
print(a, b, c, sep=',') # 以逗号为分隔符  print(x,end='')

```

---

### 常用函数库：

## 1、math库：

![image-20231205200059607](C:\Users\86178\AppData\Roaming\Typora\typora-user-images\image-20231205200059607.png)

![img](https://img-blog.csdnimg.cn/2020051210171476.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpel9MZWU=,size_16,color_FFFFFF,t_70)

![img](https://img-blog.csdnimg.cn/20200512101736126.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpel9MZWU=,size_16,color_FFFFFF,t_70)

![img](https://img-blog.csdnimg.cn/20200512101801465.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xpel9MZWU=,size_16,color_FFFFFF,t_70)