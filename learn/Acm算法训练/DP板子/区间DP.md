# 区间DP:

#####  模板题：[1068. 环形石子合并 - AcWing题库](https://www.acwing.com/problem/content/description/1070/)

题意是：给定n堆石子，任意两堆的石子河合并等于他们代价相加以及数量之和，问最大代价和最小代价去合并所有的石子。

题解：DP数组：f(i, j)，表示合并i到j堆石子的代价

```cpp
#include <iostream>
#include <algorithm> 
#include <cstdio> 
#include <cstring> 
using namespace std; 
const int N = 410, INF = 0x3f3f3f3f; 
int n, m; 
int a[N]; 
int f[N][N]; 
int g[N][N]; 
int main() 
{
    cin >> n; 
    for(int i = 1; i <= n; i ++ ) cin >> a[i]; 
    for(int i = n + 1; i <= 2 * n; i ++ ) a[i] = a[i - n]; 
    for(int i = 1; i <= n * 2; i ++ ) a[i] += a[i - 1]; 
    memset(f, 0x3f, sizeof f); 
    memset(g, -0x3f, sizeof g); 
    for(int len = 1; len <= n; len ++ ) 
    {
        for(int st = 1; st + len - 1 <= n * 2; st ++ ) 
        {
            int ed = st + len - 1;
            if(st == ed)
            {
                f[st][st] = g[st][st] = 0; 
                continue; 
            }
            for(int i = st; i < ed; i ++ ) 
                f[st][ed] = min(f[st][ed], f[st][i] + f[i + 1][ed] + a[ed] - a[st - 1]), 
                g[st][ed] = max(g[st][ed], g[st][i] + g[i + 1][ed] + a[ed] - a[st - 1]); 
        }
    }
    int maxv = -INF, minv = INF; 
    for(int i = 1; i <= n; i ++ ) 
        maxv = max(maxv, g[i][i + n - 1]), minv = min(minv, f[i][i + n - 1]); 
    cout << minv << endl << maxv << endl;  
    return 0; 
}
```

###### 图论 + 区间DP + 字典序:

题目：[479. 加分二叉树 - AcWing题库](https://www.acwing.com/problem/content/description/481/) 

DP: f(i, j), 以i到j某一点为根的二叉树，且总价值最大。

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstring> 
#include <cstdio> 
using namespace std; 
using PII = pair<int, int>; 
const int N = 35; 
int n; 
int a[N];
int f[N][N]; 
int rot[N][N]; 
bool st[N]; 
// 前序遍历：
void dfs(int l, int r) 
{
    if(l > r) 
        return;
    int root = rot[l][r];
    cout << root << ' '; 
    dfs(l, root - 1); 
    dfs(root + 1, r); 
}
int main() 
{
    cin >> n; 
    for(int i = 1; i <= n; i ++ ) 
        cin >> a[i]; 
    // memset(f, -0x3f, sizeof f);     
    for(int len = 1; len <= n; len ++ ) 
    {
        for(int l = 1; l + len - 1 <= n; l ++ ) 
        {
            int r = l + len - 1; 
            if(l == r) f[l][l] = a[l], rot[l][l] = l; 
            else {
                for(int root = l; root <= r; root ++ ) 
                {
                    int left = root - 1, right = root + 1; 
                    int vl = 1, vr = 1; 
                    if(left >= l && left <= r) vl = f[l][left]; 
                    if(right <= r && right >= l) vr = f[right][r]; 
                    if(f[l][r] < vl * vr + a[root]) 
                    {
                        f[l][r] = vl * vr + a[root]; 
                        rot[l][r] = root; 
                    }
                }
            }
        }
    }
    cout << f[1][n] << endl; 
    dfs(1, n); 
    cout << endl;    
    return 0; 
}
```

###### 记忆化搜索 + 区间DP:

因为有五个维度，所以可以写成记忆化搜索，这也是记忆化搜素的模板 

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstdio> 
#include <cstring>
#include <cmath> 
#define db double 
using namespace std; 
const int N = 16;
const double INF = 1e18; 
int n, m; 
db s[N][N]; 
db f[N][N][N][N][N]; 
db X; 
db get(int x1, int y1, int x2, int y2) 
{
    db sum = s[x2][y2] - s[x1 - 1][y2] - s[x2][y1 - 1] + s[x1 - 1][y1 - 1] - X;
    return sum * sum / n;
}
db dfs(int x1, int y1, int x2, int y2, int t) 
{
    db &v = f[x1][y1][x2][y2][t]; 
    if(v >= 0) return v; 
    if(!t) return v = get(x1, y1, x2, y2);    
    v = 1e18; 
    for(int y = y1; y < y2; y ++ ) 
        v = min(v, dfs(x1, y + 1, x2, y2, t - 1) + get(x1, y1, x2, y)),  
        v = min(v, dfs(x1, y1, x2, y, t - 1) + get(x1, y + 1, x2, y2));
    for(int x = x1; x < x2; x ++ )    
        v = min(v, dfs(x1, y1, x, y2, t - 1) + get(x + 1, y1, x2, y2)), 
        v = min(v, dfs(x + 1, y1, x2, y2, t - 1) + get(x1, y1, x, y2)) ; 
    return v; 
}
int main() 
{
    cin >> n;
    m = 8; 
    for(int i = 1; i <= m; i ++ ) 
        for(int j = 1; j <= m; j ++ ) 
            cin >> s[i][j]; 
    for(int i = 1; i <= m; i ++ ) 
        for(int j = 1; j <= m; j ++ ) 
            s[i][j] = s[i][j] + s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1]; 
    X = s[m][m] / n; 
    memset(f, -1, sizeof f); 
    printf("%.3lf\n", sqrt(dfs(1, 1, m, m, n - 1)));      
    return 0; 
}
```

