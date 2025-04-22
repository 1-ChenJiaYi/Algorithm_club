题目链接：
$https://atcoder.jp/contests/abc356/tasks/abc356_f$

---
$set、multiset$ 能做的事情：

可以维护有序序列，二分查找，但是不能维护大于/小于某个数的数量，$distance$ 函数是 $O(N)$ 


## 操作1：$lower\_bound(x)$

1、得到大于等于 $x$ 的第一个数的迭代器。

无解返回：se.end() 

判断：
```cpp
auto t = se.lower_bound(x); 
if(t==se.end() or *t < x) 无解; 
```

---
## 操作2：$upper\_bound(x)$

1、得到大于 $x$ 的第一个数的迭代器。

无解返回: se.end() 

判断：
```cpp
auto t = se.lower_bound(x); 
if(t==se.end() or *t<=x) 无解;  
```

---

## 操作3：找到最大的小于当前数值数字

```cpp

// 无解返回-1
ll check(ll va, set<ll> se) {
    auto t = se.lower_bound(va); 
    t=prev(t); 
    if(t==se.end() and *t>=va) return -1;
    return *t;
}
```

## 操作4: 找到最大的小于等于当前数值数字：
```cpp
ll check(ll va, set<ll> se) {
    if(se.count(va))return va;
    
    auto t = se.lower_bound(va); 
    t=prev(t); 
    if(t==se.end() and *t>=va) return -1;
    return *t;
}
```


