链接：https://atcoder.jp/contests/abc356/tasks/abc356_e

---

#### 问题陈述

给你一个长度为 $N$ 的序列 $A=(A_1,\ldots,A_N)$ 。

求 $\displaystyle \sum_{i=1}^{N-1}\sum_{j=i+1}^{N}\left\lfloor\frac{\max(A_i,A_j)}{\min(A_i,A_j)}\right\rfloor$ .

这里， $\lfloor x \rfloor$ 表示不大于 $x$ 的最大整数。例如， $\lfloor 3.14 \rfloor=3$ 和 $\lfloor 2 \rfloor=2$。
#### 限制因素

- $2 \leq N \leq 2\times 10^5$
- $1 \leq A_i \leq 10^6$
- 所有输入值均为整数。


---

题解：
对于这道题，要用到**预处理**的思想，首先不妨对所有的元素排序，**处理前1e6的数的数量前缀和**，对于每个i，他和 $i+1$ 到 $n$，一定是 $a[i+1..n] / a[i]$，所以，我们直接枚举a[i]的倍数，比如 $k * a[i]$，我们要的就是 $cnt[(k+1)*a[i]-1]-cnt[k*a[i]-1]$，其中所有的数都是除a[i]为k的。

时间复杂度就是 $nloglogn$。

---


CODE:
```cpp
#include <bits/stdc++.h> 
using namespace std; 
using ll = long long; 
const int N = 2e6 + 10, mod = 998244353;
ll n, a[N]; 
ll mp[N]; 
int main() {
    scanf("%lld", &n); 
    ll ans=0;
    for(int i = 1; i <= n; ++ i ) {
        scanf("%lld", &a[i]); 
        mp[a[i]]+=1;
    }
    sort(a + 1, a + 1 + n); 
    for(int i = 1; i < N; ++ i ) mp[i] += mp[i - 1];
    for(int j=1;j<n;++j) {
        if(a[j]==a[j-1])continue; 
        ll t=a[j]; 
        ll le=mp[t]-mp[t-1];  

        ans+=(le*(le-1))/2; 
        for(ll i = 1; i * t <= a[n]; ++ i ) {
            ans+=(mp[(i+1)*t-1] - mp[i*t-1]-(i==1?le:0))*i*le; 
        }
    }
    
    printf("%lld", ans); 
    return 0; 
    
}

```



