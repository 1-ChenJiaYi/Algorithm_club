### Python 输出中文字符串：

```python
import sys 
a = "运行时间是:"
b = a.encode('utf-8')
sys.stdout.buffer.write(a) 
```



### Python字符串转数字(反之用str())：

```
s = "123534" 
number = int(s) 
```



### Python输入矩阵：

```py

n, m = 0, 0 # n行m列的矩阵

lst = input().split(' ') 
n, m = int(lst[0]), int(lst[1]) 

mtx1 = []
mtx2 = []
tmp = []
for i in range(n):
    tmp = input().split(" ")
    us = []
    for j in tmp:
        if(j != ''): 
           us.append(int(j))
    mtx1.append(list(us))

for i in range(n):
    tmp = input().split(" ")
    us = []
    for j in tmp:
        if(j != ''): 
           us.append(int(j))
    mtx2.append(list(us))
    
```

---

### Python获取字符串ASCII码:

```python
ord('A') 
```

