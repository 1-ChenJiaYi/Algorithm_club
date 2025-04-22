# 状态压缩DP：

###### 模板题1：[1064. 小国王 - AcWing题库](https://www.acwing.com/problem/content/description/1066/)

状态表示：f(i, j, k): 前i行中，且总共放了j个国王，并且第i行的状态是k的方案。   

状态计算：f(i, j, k) += f(i - 1, j - t, t) 

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstdio> 
#include <cstring> 
#include <vector> 
#define pb push_back 
#define int long long 
using namespace std; 
const int N = 12, M = 110, INF = 0x3f3f3f3f; 
int n, k; 
int f[N][M][1 << N];  
bool check(int x) 
{
    for(int i = 0; i < n - 1; i ++ ) 
        if((x >> i & 1) && (x >> (i + 1) & 1)) return 0; 
    return 1; 
}
int cnt[1 << N];  
signed main() 
{
    cin >> n >> k; 
    vector<int> state, op[1 << n];     
    for(int i = 0; i < 1 << n; i ++ ) 
        if(check(i)) state.pb(i);  
    for(auto t1 : state) 
        for(auto t2 : state) 
            if(check(t1 | t2) && !(t1 & t2)) 
                op[t1].pb(t2);
    for(int i = 0; i < 1 << n; i ++ ) 
    {
        int res = 0; 
        int x = i; 
        for(int i = 31; i >= 0; i -- ) 
            if(x >> i & 1) ++ res; 
        cnt[i] = res;  
    }
    f[0][0][0] = 1; 
    for(int i = 1; i <= n + 1; i ++ ) 
        for(int j = 0; j <= k; j ++ ) 
        {
            for(auto t1 : state) 
                for(auto t : op[t1]) 
                {
                    if(j >= cnt[t1] && j - cnt[t1] >= cnt[t]) f[i][j][t1] += f[i - 1][j - cnt[t1]][t]; 
                }
        }
    cout << f[n + 1][k][0] << endl;    
    return 0; 
}
```

模板题2：[327. 玉米田 - AcWing题库](https://www.acwing.com/problem/content/description/329/)

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstdio> 
#include <cstring> 
#include <vector> 
#define pb push_back 
using namespace std; 
const int N = 13, M = 1 << N, mod = 1e8; 
int n, m; 
int f[N][M]; 
int ok[N];
bool check(int x) 
{
    for(int i = 0; i < m; i ++ ) 
        if((x >> i & 1) && (x >> (i + 1) & 1)) return 0; 
    return 1; 
}
int main() 
{
    cin >> n >> m; 
    vector<int> state; 
    for (int i = 1; i <= n; i ++ ) 
    {
        int res = 0; 
        for(int j = 0; j < m; j ++ ) 
        {
            int x; 
            cin >> x; 
            res += (!x) << (m - 1 - j);      
        } 
        ok[i] = res; 
    }
    for(int i = 0; i < 1 << m; i ++ ) 
        if(check(i)) 
            state.pb(i); 
    f[0][0] = 1;                                                 
    for(int i = 1; i <= n + 1; i ++ ) 
    {
        for(auto t1 : state) 
            for(auto t2 : state) 
            {
                if(t1 & ok[i]) continue; 
                if(t2 & ok[i - 1]) continue; 
                if((t1 & t2) == 0)      // 这个位置错过，写成了check(t1 & t2)                           
                    f[i][t1] = (f[i][t1] + f[i - 1][t2]) % mod; 
            } 
    } 
    cout << f[n + 1][0] << endl; 
    return 0; 
}
```

