div2补提：[Dashboard - Codeforces Round 860 (Div. 2) - Codeforces](https://codeforces.com/contest/1798)

C:

题意：给定n个a[i]和b[i]，从头到尾看，如果能够取得c，c是a[i]的因数，c * b[i]如果相等就归为一组，按顺序遍历，如果发现某个不行就再开一个组，求最少的组

题解：c * b[i]相等的才能开一组，假设a[i],b[i], a[j],b[j]能够凑成一组，最终它们凑成的一定是k * lcm(b[i], b[j])(k >= 1)

```
lcmv = k * lcm(b[i], b[j])(k >= 1)
对于a[i]: a[i] % (lcmv / b[i]) == 0
对于a[j]: a[j] % (lcmv / b[j]) == 0
所以一定是满足 a % x == 0, x * b[i] = lcmv; 
所以当令c[i] = a[i] * b[i]，
当lmcv = lcm(b[i], b[j]); 
假设对于i，j都满足：
x * b[i]满足，a[i] * b[i] / x * b[i] = a[i] / x; a[j] * b[j] / y * b[j] = a[j] / y; 
x * b[i] == y * b[j] = lcmv,所以lcmv是c[i]和c[j]的公因数，如果gcd(c[i], c[j]) % lcmv == 0说明可以凑一组。

```

D:

题意：给定一个长度为n的序列a，所有元素累加起来等于0，要求按任意顺序排列原来的元素，使得序列满足，最大的max(|al + ... + ar|) < Max(a[1], a[n]) - min(a[1], a[n]) 

题解：因为前提条件是：a[1] + a[2] + ... + a[n] = 0; 

第一种全0数组，那最后一定是max(|al + ... + ar|) < Max(a[1], a[n]) - min(a[1], a[n]) 为 0 <= 0无解

第二种有正有负，先排序。

```
证明最大值是max(a[n], -a[1]):
开始时：==0只能放a[1]，此时最大的abs(sum(l...r))=-a[1],此时<=0,开始放a[r],最坏情况下放到了临界点，最多只有-a[1]-1+a[n]的值，继续放负数，最少为a[n]-1....永远不可能大于-a[1] + a[n]的值，也就是max - min的值。 
```

---

div2 round 885蹄解：

[(2条消息) Codeforces Round 885 (Div. 2) 蹄解_嘗_的博客-CSDN博客](https://blog.csdn.net/m0_74847145/article/details/131758115)

---

div4 round 886 补提：

E: [Problem - E - Codeforces](https://codeforces.com/contest/1850/problem/E)

题意是：给定一堆的正方形图片和使用的面积c, 所有的图片都i有相同宽度的边框，求边框大小，一定会有唯一答案。

蹄解：看出来是二分，但是__int128忘记怎么用了每调出来,假设宽度为x，所有的(2 * x + l) * x * 2 + 2 * x * l的累加等于c, 所以只需要二分1和1e9找答案即可 

**这里总结一下__int128的用法：**

**声明变量 __int128 x;** 

**int128不能直接输入**

**强制类型转换：__int128(x);** 

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstring> 
#include <string> 
#include <bits/stdc++.h> 
#include <set> 
#include <map> 
#define ll long long 
using namespace std; 
const int N = 2e5 + 10, INF = 0x3f3f3f3f; 
int n, m; 
int main() 
{
    int _; 
    cin >> _; 
    while(_--)
    {
        ll n, m; 
        ll a[N]; 
        cin >> n >> m; 
        __int128 g2 = 0; 
        for(int i = 1; i <= n; i ++ ) 
        {
            cin >> a[i];
            m -= a[i] * a[i];
            g2 += a[i];  
        }
        
        m /= 4; 
        ll l = 0, r = 1e9; 
        while(l < r) 
        {
             ll mid = l + r >> 1; 
             __int128 k = n * mid * mid + mid * g2; 
             if(__int128(n) * mid * mid + __int128(g2) * mid < m) l = mid + 1; 
             else r = mid;
        }
        
        cout << l << endl; 
    
        
    }
    
    return 0; 
}
```

F:[Problem - F - Codeforces](https://codeforces.com/contest/1850/problem/F)

题意是：给定n个整数，每个人最开始都在0点，并且每次可以跳越整数个格子，求在1到n上哪里放陷阱能抓到最多人。

蹄解：可以知道找到最多数所在的公倍数就是答案，所以将所有位于1到n的数标记一下，从n到1每次把这个数的倍数标记加1最后枚举一遍就是答案

但是为什么要从后往前枚举呢，因为如果从前往后枚举是会有重复的，假设1， 2， 4都有1，1，2，4最初的标记均为1，但是1会标到2，4， 2又会有重复的标记到4，只有倒叙的时候不会有重复。

而且n的范围是2e5，每次考虑1到n可以使时间复杂度为nlog(n); 

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstring> 
#include <string> 
#include <set> 
#include <map> 
#define ll long long 
using namespace std; 
const int N = 2e5 + 10, INF = 0x3f3f3f3f; 
int n, m; 
int gcd(int x, int y) 
{
    return y ? gcd(y, x % y) : x; 
}

int lcm(int x, int y) {
    return x * y / gcd(x, y); 
}
int main() 
{
    int _; 
    cin >> _; 
    while(_--)
    {
        int cnt[N] {0}; 
        
        int a[N], n; 
        cin >> n; 
        vector<int> t; 
        for(int i = 1; i <= n; i ++ ) 
        {    
            cin >> a[i]; 
            if(a[i] <= n) cnt[a[i]] ++; 
        }
        sort(t.begin(), t.end()); 
        for(int i = n; i >= 1; i -- ) 
        {
            for(int j = i * 2; j <= n; j += i) 
                cnt[j] += cnt[i]; 
        }
        
        int ans = -2e5;
        for(int i = 1; i <= n; i ++ ) 
            ans = max(ans, cnt[i]); 
            
        cout << ans << endl; 
        
    }
    
    return 0; 
}
```

---

div3:
