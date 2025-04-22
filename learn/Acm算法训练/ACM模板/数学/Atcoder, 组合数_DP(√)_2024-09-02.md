链接：https://atcoder.jp/contests/abc358/tasks/abc358_e

# 题意：


AtCoder Land销售带有英文字母的瓷砖。高桥正在考虑通过排列这些瓷砖来制作一个名字牌。
求满足以下条件的字符串的数量（模 $998244353$），这些字符串由长度在 $1$ 到 $K$ 之间（包括 $1$ 和 $K$）的大写英文字母组成：
对于每个满足 $1 \leq i \leq 26$ 的整数 $i$，以下条件成立：
设 $a_i$ 是按字典顺序排列的第 $i$ 个大写英文字母。例如，$a_1 = A$，$a_5 = E$，$a_{26} = Z$。
字符串中 $a_i$ 的出现次数在 $0$ 到 $C_i$ 之间（包括 $0$ 和 $C_i$）。

--- 


* $dp[i][j]: 前i种字母中，已经放了j个的方案。$
* 转移方程：
```cpp
    dp[0][0] = 1; 
    for(int i = 1; i <= 26; ++ i ) {
        for(int j = 0; j <= n; ++ j ) 
            for(int k = 0; k <= a[i] and j + k <= n; ++ k ) {
                dp[i][j+k]=(dp[i][j+k]+dp[i-1][j]*f(n-j,k))%mod;
            }
    }
```

---

CODE:
```cpp
#include <bits/stdc++.h> 
using namespace std; 
using ll = long long; 
const int N = 1002, mod = 998244353; 
ll n,a[N];

ll f1[N], f2[N];  

ll dp[N][N]; 
ll ksm(ll x, ll y) {
    ll res=1;
    while(y) {
        if(y&1) res=res*x%mod;
        x=x*x%mod;
        y>>=1; 
    }
    return res; 
}

ll f(ll a, ll b) {
    return f1[a] * f2[b] % mod * f2[a - b] % mod;  
}

int main() {
    cin >> n; 
    f1[0] = 1, f2[0] = 1; 
    for(int i = 1; i <= 1000; ++ i ) {
        f1[i] = f1[i - 1] * i % mod; 
        f2[i] = ksm(f1[i], mod-2); 
    }
    
    for(int i = 1; i <= 26; ++ i ) cin>>a[i];
    
    dp[0][0] = 1; 
    for(int i = 1; i <= 26; ++ i ) {
        for(int j = 0; j <= n; ++ j ) 
            for(int k = 0; k <= a[i] and j + k <= n; ++ k ) {
                dp[i][j+k]=(dp[i][j+k]+dp[i-1][j]*f(n-j,k))%mod;
            }
    }
    
    ll ans = 0; 
    for(int i = 1; i <= n; ++ i ) {
        ans = (ans + dp[26][i] * ksm(f(n,i),mod-2) % mod) % mod; 
    }
    
    cout<<ans<<endl; 

    return 0; 
    
}

```
