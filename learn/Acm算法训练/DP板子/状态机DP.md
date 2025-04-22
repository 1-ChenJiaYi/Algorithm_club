##### 状态机DP:

当事件的状态是一个很复杂的状态或者是由多个相互之间有联系的状态合并而成的，每个状态点连成的图是一个拓扑图，根据拓扑图的状态，可以将在i点的状态分裂成：f(i, 0)，f(i, 1)......f(i, k);

典型例题1(cf [Problem - A - Codeforces](https://codeforces.com/contest/698/problem/A))

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstdio> 
#include <cstring> 
#include <vector> 
#include <queue> 
#define pb push_back   
#define int long long 
#define ff first 
#define ss second 
using namespace std; 
using PII = pair<int, int>; 
const int N = 2e5 + 10; 
int n, m; 
int a[N];
int f[N][5]; 
string de = "debug "; 
signed main() 
{
    memset(f, 0x3f, sizeof f); 
    cin >> n; 
    for(int i = 1; i <= n; i ++ ) 
        cin >> a[i]; 
    f[0][0] = 0; 
    for(int i = 1; i <= n; i ++ ) 
    {
        int c = a[i]; 
        if(!c) 
        {
            // 只能休息 
            f[i][0] = min(f[i - 1][0] + 1, f[i - 1][1] + 1); 
            f[i][0] = min(f[i][0], f[i - 1][2] + 1);  
        }
        else if(c == 1) 
        {
            // 比赛和休息
            f[i][0] = min(f[i - 1][0] + 1, f[i - 1][1] + 1); 
            f[i][0] = min(f[i][0], f[i - 1][2] + 1); 
            f[i][1] = min(f[i - 1][0], f[i - 1][2]); 
        }
        else if(c == 2) 
        {
            //运动和休息
            f[i][0] = min(f[i - 1][0] + 1, f[i - 1][1] + 1); 
            f[i][0] = min(f[i][0], f[i - 1][2] + 1); 
            f[i][2] = min(f[i - 1][0], f[i - 1][1]); 
        }
        else 
        {
            //随便干嘛
            f[i][0] = min(f[i - 1][0] + 1, f[i - 1][1] + 1); 
            f[i][0] = min(f[i][0], f[i - 1][2] + 1); 
            f[i][1] = min(f[i - 1][0], f[i - 1][2]); 
            f[i][2] = min(f[i - 1][0], f[i - 1][1]); 
        }
    }
    cout << min(min(f[n][1], f[n][0]), f[n][2]) << endl; 
    return 0; 
}
```

典型例题2：[1052. 设计密码 - AcWing题库](https://www.acwing.com/problem/content/description/1054/)

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstdio> 
#include <cstring>
#include <string>
using namespace std; 
const int N = 55, mod = 1e9 + 7; 
int n, m; 
char s[N]; 
int ne[N]; 
int f[N][N]; 
int main() 
{
    cin >> n >> s + 1; 
    m = strlen(s + 1); 
    for(int i = 2, j = 0; i <= m; i ++ ) 
    {
        while(j && s[j + 1] != s[i]) j = ne[j]; 
        if(s[j + 1] == s[i]) j ++; 
        ne[i] = j; 
    }
    f[0][0] = 1; 
    for(int i = 0; i < n; i ++ ) 
    {
        for(int j = 0; j < m; j ++ ) 
            for(char c = 'a'; c <= 'z'; c ++ ) 
            {
                int u = j; 
                while(u && s[u + 1] != c) u = ne[u]; 
                if(s[u + 1] == c) u ++; 
                if(u < m) f[i + 1][u] = (f[i + 1][u] + f[i][j]) % mod; 
            }
    }
    int ans = 0; 
    for(int i = 0; i < m; i ++ ) 
        ans = (ans + f[n][i]) % mod;        
    cout << ans << endl; 
    return 0; 
}
```

// 树上状态机:

