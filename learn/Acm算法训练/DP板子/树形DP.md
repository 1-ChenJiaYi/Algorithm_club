# 树形dp(换根DP):

##### 知识点1：树的直径（树中一个节点到另一个节点的距离的最大值：

模板题：[1072. 树的最长路径 - AcWing题库](https://www.acwing.com/problem/content/1074/)

证明：在一颗连通的无向树，其直径是对任意节点做dfs的最长距离和最短距离之和。

算法模板：

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstdio> 
#include <cstring> 
#define int long long 
using namespace std; 
const int N = 10010, M = N * 2,  INF = 1e18; 
int n, m; 
int h[N], e[M], ne[M], w[M], idx; 
int f[N]; 
int ans = -INF; 
void add(int a, int b, int c)  
{
    e[idx] = b, ne[idx] = h[a], w[idx] = c, h[a] = idx ++; 
}

int dfs(int u, int fa)   
{
    int d1 = 0, d2 = 0; 
    for(int i = h[u]; ~i; i = ne[i]) 
    {
        int j = e[i]; 
        if(j == fa) continue; 
        int d = dfs(j, u) + w[i]; 
        if(d > d1) d2 = d1, d1 = d; 
        else if(d > d2) d2 = d; 
    }
    ans = max(ans, d1 + d2);  
    
    return d1; 
}
signed main() 
{
    memset(h, -1, sizeof h); 
    cin >> n; 
    for(int i = 0; i < n - 1; i ++ ) 
    {
        int a, b, c; 
        cin >> a >> b >> c; 
        add(a, b, c), add(b, a, c); 
    }
    dfs(1, -1); 
    cout << ans << endl;    
    return 0; 
}
```

##### 知识点2：换根dp优化， 复杂度从O(n * n)优化到O(n):

模板题：找每个节点距离最远的点，每次处理一个子节点方向上的最大距离和次大距离, 再找向上的不经过它的最大距离。[1073. 树的中心 - AcWing题库](https://www.acwing.com/problem/content/1075/)

首先整颗树是颗无向连通树，所以从根节点开始可以求得向子节点（往下走的）最长和次长的信息，最重要的是，根节点的信息一定是可以完全知道的，因为所有节点都是它的子节点，所以对于它的直接子节点如果最长的那条不经过就可以用其更新up,否则就用次长来更新，最后从根往下，一定能求得所有的节点。

```cpp
// 模板： 
#include <iostream> 
#include <algorithm> 
#include <cstring> 
#include <cstdio> 
using namespace std; 
const int N = 10010, M = 2 * N, INF = 0x3f3f3f3f; 
int n, m; 
int d[N]; 
int h[N], e[M], ne[M], w[M], idx; 
int d1[N], d2[N]; 
int up[N]; 
int s1[N], s2[N]; 
void add(int a, int b, int c)  
{
    e[idx] = b, ne[idx] = h[a], w[idx] = c, h[a] = idx ++; 
}
int dfs_down(int u, int fa)  
{
    for(int i = h[u]; ~i; i = ne[i]) 
    {
        int j = e[i]; 
        if(j == fa) continue; 
        int d = dfs_down(j, u) + w[i];
        if(d1[u] <= d) 
        {
            d2[u] = d1[u], d1[u] = d;
            s1[u] = j; 
        }
        else if(d2[u] < d) 
        {
            d2[u] = d; 
        }
    }
    return d1[u]; 
}
void dfs_up(int u, int fa) 
{
    for(int i = h[u]; ~i; i = ne[i]) 
    {
        int j = e[i]; 
        if(j == fa) continue;        
        if(s1[u] != j) up[j] = max(up[u], d1[u]) + w[i]; 
        else up[j] = max(up[u], d2[u]) + w[i]; 
        dfs_up(j, u);
    }
}
int main() 
{
    memset(h, -1, sizeof h); 
    cin >> n; 
    for(int i = 0; i < n - 1; i ++ ) 
    {
        int a, b, c; 
        cin >> a >> b >> c; 
        add(a, b, c), add(b, a, c); 
    }
    dfs_down(1, -1); 
    dfs_up(1, -1); 
    int ans = INF; 
    for(int i = 1; i <= n; i ++ ) ans = min(ans, max(up[i], d1[i])); 
    cout << ans <<  endl; 
    return 0; 
}
```



##### 知识点3：树上状态机 (既涵盖了树形dp，也涵盖了状态机dp的知识)： 

###### 问题1：树上状态机覆盖所有边：[323. 战略游戏 - AcWing题库](https://www.acwing.com/problem/content/325/)

题意：可以在每个点放与不放士兵，每个点连通的边可以被监视，要求监视覆盖所有的边。

题解：状态机dp，dp数组f(i, j), j = {0, 1}，

f(i, 0): 表示该位置放士兵，f(i, 1): 表示该位置不放士兵 

如果该位置放置的士兵，其余节点可放可不放取min，如果该位置不放置士兵，那它的子节点必须放置，如果不放置，他们之间的边就会空出来，不符合题意。

```cpp
// 模板
#include <iostream> 
#include <algorithm> 
#include <cstring> 
#include <cstdio> 
#include <cmath> 
using namespace std; 
const int N = 1610, M = N << 1, INF = 0x3f3f3f3f; 
int n, m; 
int h[N], e[M], ne[M], idx; 
int f[N][3]; 
bool st[N]; 
void add(int a, int b) 
{
    e[idx] = b, ne[idx] = h[a], h[a] = idx ++; 
}
void dfs(int u) 
{
    f[u][0] = 0, f[u][1] = 1; 
    for(int i = h[u]; ~i; i = ne[i]) 
    {
        int j = e[i]; 
        dfs(j); 
        f[u][0] += f[j][1]; 
        f[u][1] += min(f[j][1], f[j][0]); 
    }
}
int main() 
{
    while(cin >> n) 
    {
        memset(st, 0, sizeof st); 
        memset(h, -1, sizeof h); 
        idx = 0;
        int root = 1; 
        for(int i = 0; i < n; i ++ ) 
        {
            int u, v, cnt; 
            scanf("%d:(%d)", &u, &cnt); 
            u ++; 
            while(cnt --) 
            {
                cin >> v; 
                v ++; 
                add(u, v); 
                st[v] = 1; 
            }
        }
        while(st[root]) root ++; 
        dfs(root) ;
        cout << min(f[root][0], f[root][1]) << endl; 
    }
    return 0; 
}
```



###### 问题2：树上状态机覆盖所有点：[1077. 皇宫看守 - AcWing题库](https://www.acwing.com/problem/content/1079/)

题意：每个点放置以后可以监察连接的点，要求放置最小的士兵，可以检查所有的点。

题解：dp数组：f(i, j) j = {0, 1, 2} , 最主要的是它的状态表示，太妙了。

f(i, 0): 父节点放，此节点不放

f(i, 1): 子节点放，此节点不放

f(i, 2): 此节点放置

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstdio> 
#include <cstring> 
using namespace std; 
const int N = 1510, M = N << 1, INF = 0x3f3f3f3f; 
int n, m; 
int h[N], e[M], ne[M], idx; 
int f[N][3]; 
int w[N];  
bool st[N]; 
int root = 1; 
void add(int a, int b) 
{
    e[idx] = b, ne[idx] = h[a], h[a] = idx ++; 
}
void dfs(int u)
{
    int sum = 0; 
    for(int i = h[u]; ~i; i = ne[i]) 
    {
        int j = e[i]; 
        dfs(j); 
        f[u][2] += min(f[j][1], min(f[j][0], f[j][2])); 
        f[u][0] += min(f[j][1], f[j][2]); 
        sum += min(f[j][1], f[j][2]);  
    }
    f[u][1] = INF; 
    for(int i = h[u]; ~i; i = ne[i]) 
    {
        int j = e[i]; 
        f[u][1] = min(f[u][1], sum - min(f[j][1], f[j][2]) + f[j][2]); 
    }
}
int main() 
{
    memset(h, -1, sizeof h); 
    cin >> n; 
    for(int i = 1; i <= n; i ++ ) 
    {
        int id, k, m; 
        cin >> id >> k >> m; 
        w[id] = k; 
        while(m --) 
        {
            int x; cin >> x; 
            st[x] = 1; 
            add(id, x); 
        }
    }
    f[root][0] = 0; 
    for(int i = 1; i <= n; i ++ ) f[i][2] = w[i]; 
    while(st[root]) root ++; 
    dfs(root); 
    cout << min(f[root][1], f[root][2]) << endl; 
    return 0; 
}
```

