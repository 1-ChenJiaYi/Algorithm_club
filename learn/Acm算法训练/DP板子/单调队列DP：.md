# 单调队列DP：

##### 一、单调队列模板： 一般队列内存的是下标。 

模板题：滑动窗口，给定一个长度为n的序列，输出每个长度为m的窗口的最大值和最小值。

时间复杂度：O(n + n) ，复杂度是线性的。

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstdio> 
#include <cstring> 
using namespace std; 
const int N = 1000010, INF = 0x3f3f3f3f; 
int n, m; 
int q[N], hh, tt = -1;  
int a[N]; 
int main() 
{
    cin >> n >> m; 
    for(int i = 1; i <= n; i ++ ) 
        cin >> a[i]; 
    for(int i = 1; i <= n; i ++ ) 
    {
        if(hh <= tt && i - q[hh] + 1 > m) hh ++;
        while(hh <= tt && a[q[tt]] >= a[i]) tt --;
        q[++ tt] = i; 
        if(i >= m) cout << a[q[hh]] << ' '; 
    }
    hh = 0, tt = -1; 
    cout << endl; 
    for(int i = 1; i <= n; i ++ ) 
    {
        if(hh <= tt && i - q[hh] + 1 > m) hh ++; 
        while(hh <= tt && a[q[tt]] <= a[i]) tt --; 
        q[++ tt] = i; 
        if(i >= m) cout << a[q[hh]] << ' '; 
    }
    cout << endl; 
    return 0; 
}
```

##### 二、单调队列优化dp模板:

##### 模板题1、输入一个长度为 n的整数序列，从中找出一段长度不超过 m 的连续子序列，使得子序列中所有数的和最大。（最大子序和）[135. 最大子序和 - AcWing题库](https://www.acwing.com/problem/content/description/137/)

题解：这道题是求最大的长度不超过m的子序和最大，先求前缀和，再取最大的s[r] - s[l - 1], 所以，l - 1作为对头，最多可以取到i - m；

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstdio> 
#include <cstring> 
#define int long long 
using namespace std; 
const int N = 300010, INF = 0x3f3f3f3f; 
int n, m; 
int s[N]; 
int q[N]; 
int hh, tt; 
signed main() 
{
    cin >> n >> m; 
    for(int i = 1; i <= n; i ++ ) 
    {
        cin >> s[i];  
        s[i] += s[i - 1]; 
    }
    q[0] = 0; 
    int ans = s[1]; 
    for(int i = 1; i <= n; i ++ ) 
    {
        if(hh <= tt && q[hh] < i - m) hh ++; 
        ans = max(ans, s[i] - s[q[hh]]); 
        while(hh <= tt && s[q[tt]] >= s[i]) tt --; 
        q[++ tt] = i; 
    }
    cout << ans << endl;
    return 0; 
}
```

##### 模板题2：[1087. 修剪草坪 - AcWing题库](https://www.acwing.com/problem/content/description/1089/)

题解：

f(i) 前i个位置中，表示在i个位置放牛的方案。

状态转移：f(i) = max(f(j - 1)) + w[i]，j 在 [i - m + 1, i] 之间，也就是满足 if(hh <= tt && q[hh] < i - m) hh ++; 

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstdio> 
#include <cstring> 
#define int long long 
using namespace std; 
const int N = 100010, INF = 0x3f3f3f3f;
int n, m; 
int s[N]; 
int f[N];
int q[N], hh, tt; 
int g(int x) 
{
    return f[x - 1] - s[x]; 
}
signed main() 
{
    cin >> n >> m; 
    for(int i = 1; i <= n; i ++ ) 
    {
        cin >> s[i]; 
        s[i] += s[i - 1]; 
    }
    q[0] = 0; 
    for(int i = 1; i <= n; i ++ ) 
    {
        if(hh <= tt && q[hh] < i - m) hh ++; 
        f[i] = max(f[i - 1], g(q[hh]) + s[i]); 
        while(hh <= tt && g(q[tt]) <= g(i)) tt --; 
        q[++ tt] = i; 
    }
    cout << f[n] << endl; 
    return 0; 
}
```

##### 三、环形 + 单调队列dp：旅行问题: [1088. 旅行问题 - AcWing题库](https://www.acwing.com/problem/content/description/1090/)

题解：顺时针和逆时针的环形问题，这个问题纠细节还是很值得深究的。

###### 总结规律：每次都必须从终点到起点反向扫描：（重点）

证明: 构造好一条链子，前缀和已知。

 1、每次都从起点到终点，假设从起点到终点，一定是终点反向做单调队列dp，因为要考虑从起点开始的所有情况（因为有可能从起点到达一个非终点前缀和为负数），起点 - 1前缀和是确定的，如果反向做，就能得到最小的前缀和，最后用这两个前缀和。

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstring> 
#include <cstdio> 
#define int long long 
using namespace std; 
const int N = 1000010, INF = 0x3f3f3f3f; 
int n, m; 
int oil[N], dist[N]; 
int s[N], g[N]; 
int q[N], hh, tt = -1; 
bool st[N]; 
signed main() 
{
    cin >> n; 
    for(int i = 1; i <= n; i ++ )
    {
        cin >> oil[i] >> dist[i]; 
        oil[i + n] = oil[i]; 
        dist[i + n] = dist[i]; 
    }
    for(int i = 1; i <= n * 2; i ++ ) 
        s[i] = oil[i] - dist[i]; 
    for(int i = 1; i <= n * 2; i ++ ) 
        s[i] += s[i - 1]; 
    // 顺时针： 
    for(int i = n * 2; i; i -- )  
    {
        if(hh <= tt && q[hh] > i + n) hh ++; 
        while(hh <= tt && s[q[tt]] >= s[i]) tt --; 
        q[++ tt] = i; 
        if(i <= n && s[q[hh]] >= s[i - 1]) st[i] = 1;  
    }
    g[1] = g[n + 1] = oil[1] - dist[n]; 
    // 逆时针：
    for(int i = 2; i <= n; i ++ ) 
        g[i] = g[i + n] = oil[i] - dist[i - 1];  
    for(int i = 1; i <= n * 2; i ++ ) 
        g[i] += g[i - 1];   
    hh = 0, tt = 0;     
    for(int i = 1; i <= n * 2; i ++ ) 
    {
        if(hh <= tt && q[hh] < i - n)  hh ++; 
        while(hh <= tt && g[q[tt]] <= g[i]) tt --; 
        q[++ tt] = i; 
        if(i >= n + 1 && g[q[hh]] <= g[i]) st[i - n] = 1;
    }
    for(int i = 1; i <= n; i ++ ) 
        if(st[i]) puts("TAK"); 
        else puts("NIE"); 
    return 0; 
}
```

##### 四、裸的单调队列dp，是模板题2的类型：

题：[1089. 烽火传递 - AcWing题库](https://www.acwing.com/problem/content/1091/)

```cpp
// 分析dp
f(i): 表示第i个位置放置烽火的方案。
状态转移方程：f(i) = f(j) + e[i], j的范围：[i - m, i - 1]; 
```

```cpp
// 模板：
#include <iostream> 
#include <algorithm> 
#include <cstdio> 
#include <cstring> 
#define int long long 
using namespace std; 
const int N = 200010, INF = 0x3f3f3f3f; 
int n, m; 
int q[N], hh, tt; 
int s[N]; 
int f[N]; 
int g(int x) 
{
    return f[x]; 
}
signed main() 
{
    cin >> n >> m; 
    for(int i = 1; i <= n; i ++ ) 
    {
        cin >> s[i]; 
        s[i] += s[i - 1]; 
    }
    for(int i = 1; i <= n; i ++ ) 
    {
        if(hh <= tt && q[hh] < i - m) hh ++; 
        f[i] = g(q[hh]) + s[i] - s[i - 1];   
        while(hh <= tt && g(q[tt]) >= g(i))  tt --; 
        q[++ tt] = i; 
    }
    int ans = 1e18; 
    for(int i = n - m + 1; i <= n; i ++ ) 
        ans = min(ans, f[i]);  
    cout << ans << endl; 
    return 0; 
}
```

主要还是来看这道拓展题：二分 + 模板题2的板子：

题目：[1090. 绿色通道 - AcWing题库](https://www.acwing.com/problem/content/description/1092/)

每次二分空题数，再套上模板题2的板子即可, 连dp表示都是一样的。

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstring> 
#include <cstdio> 
#define int long long 
using namespace std; 
const int N = 100010, INF = 0x3f3f3f3f; 
int n, m; 
int q[N], hh, tt; 
int w[N]; 
int f[N]; 
bool check(int x) 
{
    memset(f, 0x3f, sizeof f); 
    f[0] = 0; 
    hh = 0, tt = 0; 
    for(int i = 1; i <= n; i ++ ) 
    {
        if(hh <= tt && q[hh] < i - x - 1) hh ++;  
        f[i] = f[q[hh]] + w[i]; 
        while(hh <= tt && f[q[tt]] >= f[i]) tt --; 
        q[++ tt] = i; 
    }
    int ans= 1e18; 
    for(int i = n - x; i <= n; i ++ ) 
        ans = min(ans, f[i]); 
    return ans <= m; 
}
signed main() 
{
    cin >> n >> m; 
    for(int i = 1; i <= n; i ++ ) cin >> w[i]; 
    int l = 0, r = n; 
    while(l < r) 
    {
        int mid = l + r >> 1; 
        if(check(mid)) r = mid; 
        else l = mid + 1; 
    }   
    cout << l << endl; 
    return 0; 
}
```

##### 五、二维单调队列优化： 

题目：给定一个n * m的矩阵，求出每个k * k的矩阵的最大值和最小值之差，找到这个差值的最小值。

[1091. 理想的正方形 - AcWing题库](https://www.acwing.com/problem/content/description/1093/)

题解：mv[N] [N]  ，mn[N] [N]

```
mv[i][]表示的是： 以i结尾的长度为k的滑动窗口的最大值。
mv[i][]           ....                    最小值
```

先对每一行预处理出来mv和mn, 再对他们的列做一次，然后从k开始直接找到最大值和最小值。

```cpp
// 代码模板：
#include <iostream> 
#include <algorithm> 
#include <cstring> 
#include <cstdio> 
#define int long long 
#define IO ios::sync_with_stdio(false), cin.tie(0), cout.tie(0); 
using namespace std; 
const int N = 1010, INF = 0x3f3f3f3f; 
int n, m, k;   
int a[N][N]; 
int q[N]; 
int mv[N][N], mn[N][N]; 
void get_max(int v[], int c[], int o) {
    int hh = 0, tt = -1; 
    for(int i = 1; i <= o; i ++ ) 
    {
        if(hh <= tt && q[hh] <= i - k) hh ++; 
        while(hh <= tt && c[q[tt]] <= c[i]) tt --; 
        q[++ tt] = i; 
        v[i] = c[q[hh]];
    }
}
void get_min(int v[], int c[], int o) {
    int hh = 0, tt = -1; 
    for(int i = 1; i <= o; i ++ ) 
    {
        if(hh <= tt && q[hh] <= i - k) hh ++; 
        while(hh <= tt && c[q[tt]] >= c[i]) tt --; 
        q[++ tt] = i; 
        v[i] = c[q[hh]];
    }
}
signed main() 
{
    IO; 
    cin >> n >> m >> k;  
    for(int i = 1; i <= n; i ++ ) 
        for(int j = 1; j <= m; j ++ ) 
            cin >> a[i][j]; 
   for(int i = 1; i <= n; i ++ ) 
        get_max(mv[i], a[i], m), get_min(mn[i], a[i], m);    
    int ans = 1e18; 
    for(int i = k; i <= m; i ++ ) 
    {
        int c1[N], c2[N], cm[N], cn[N]; 
        for(int j = 1; j <= n; j ++ ) c1[j] = mv[j][i], c2[j] = mn[j][i]; 
        get_max(cm, c1, n), get_min(cn, c2, n);
        for(int j = k; j <= n; j ++ ) ans = min(ans, cm[j] - cn[j]); 
    }
    cout << ans << endl; 
    return 0; 
}
```

