https://atcoder.jp/contests/arc160/tasks/arc160_a

---

$nth\_element$: 可以快速得到数组中第$k$小的数字，时间复杂度是$O(n)$

---

用法：
```
// 找数组q(1~idx)第k个数，根据cmp函数。
nth_element(q+1,q+k,q+1+idx,cmp); 
```

