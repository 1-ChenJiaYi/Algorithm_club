#### 一、数字三角形模型：

1、从四维状态优化到三维状态:

###### 典题：在一个网格图中，从左上角走到右下角走两次并且数字只能取一次，最终取到的数字总和最大是多少。

（链接：[1027. 方格取数 - AcWing题库](https://www.acwing.com/problem/content/1029/)）

```
1、状态表示： f[i1][i2][j], 同时考虑第一条路线和第二条路线，第一条路线在横向走了i1步，第二条路线在横向走了i2步，两条路线目前走过的总步数是j的最大数字总和。

2、状态转移：
对于目前的i1: (i1, j - i1)，它可以通过(i1 - 1, j - i1), (i1, j - i1 - 1)  
对于目前的i2; (i2, j - i2)，它可以通过(i2 - 1. j - i2), (i2, j - i2 - 1) 
总结一下就是：f[i1 - 1][i2 - 1][j - 1], f[i1 - 1][i2][j - 1]，f[i1][i2 - 1][j - 1], f[i1][i2][j - 1] + number;
number需要根据i1和i2的值来选择，如果i1 == i2，那只能加一个，如果i1 != i2, 那两个数字都要加上
```

```cpp
// 模板：
    for(int st = 1; st <= n * 2; st ++ ) 
        for(int i1 = 1; i1 <= n; i1 ++ )
            for(int i2 = 1; i2 <= n; i2 ++ ) 
            {
                int j1 = st - i1, j2 = st - i2; 
                if(j1 >= 1 && j1 <= n && j2 >= 1 && j2 <= n) 
                {
                    int &v = f[i1][i2][st]; 
                    int d = a[i1][j1]; 
                    if(i1 != i2) d += a[i2][j2]; 
                    //v = max(v, f[i1][i2][st - 1] + d); 
                    if(chect(i1 - 1)) v = max(v, f[i1 - 1][i2][st - 1 ] + d); 
                    if(chect(i2 - 1)) v = max(v, f[i1][i2 - 1][st - 1] + d); 
                    if(chect(i1 - 1) && chect(i2 - 1)) v = max(v, f[i1 - 1][i2 - 1][st - 1 ] + d); 
                }
            }
```

----

-----

#### 二、最长上升子序列模型(LIS)：

###### 问题1：二分求最长上升子序列、最长下降子序列、最长不上升子序列、最长不下降子序列:

1、最长上升子序列（二分模板，nlog(n)): 

```
基于贪心的求最长上升子序列：
贪心策略：找到维护好的最长上升子序列中第一个大于等于x的数，并替换掉它
证明：
1、当加入的数为x，当加入到中间时长度并未改变，无矛盾，当加入到末尾时显然无矛盾。
2、当加入的数字分别是x和x_时，一共有4种情况，x最后，x_最后：正确；x最后，x_中间，x可以加到序列的后面，x_加入后不会改变原序列的长度，正确；同理，x中间，x_最后也正确；x中间，x_中间也正确，综上所述，当使用该策略连续增加两个数正确，因此，在已经维护好的最长上升序列使用策略正确。
```

```cpp
// 模板LIS：
#include <iostream> 
#include <cstdio> 
#include <cstring> 
#include <algorithm> 
using namespace std; 
const int N = 100010, INF = 0x3f3f3f3f; 
int n, m; 
int q[N], a[N]; 
int main() 
{
    cin >> n; 
    for(int i = 1; i <= n; i ++ ) 
        cin >> a[i]; 
    int len = 0; 
    q[0] = -INF;
    for(int i = 1; i <= n; i ++ ) {
        int x = a[i]; 
        int l = 0, r = len; 
        while(l < r) {
            int mid = l + r + 1 >> 1; 
            if(q[mid] < x) l = mid; 
            else r = mid - 1; 
        }
        q[r + 1] = x; 
        len = max(len, r + 1); 
    }
    cout << len << endl; 
    return 0; 
}
```

###### 问题2：最长下降子序列：其实妙一点可以转换成反向的最长上升序列。(以下是acm模板)

```cpp
// 最长下降子序列
void solve() 
{
    cin >> n; 
    for(int i = 1; i <= n; i ++ ) 
        cin >> a[i]; 
    q[0] = -INF; 
    for(int i = n; i >= 1; i -- ) 
    {
        int l = 0, r = len; 
        int x = a[i]; 
        while(l < r) 
        {
            int mid = l + r + 1 >> 1; 
            if(q[mid] < x) l = mid; 
            else r = mid - 1; 
        }
        q[r + 1] = x; 
        len = max(len, r + 1); 
    }
    cout << len << endl; 
}
```

###### 问题三：最长不上升子序列(模板)：

```cpp
// 模板：最长不上升子序列 
que[0] = 0x3f3f3f3f; 
    int len = 0, res = 0; 
    g[0] = 2e9; 
    for(int i = 0; i < n; i ++ ) 
    {
        // 最长降序子序列（可以相等） 
        int l = 0, r = len;
        if(que[len] >= q[i]) que[++len] = q[i]; 
        else 
        {
            while(l < r) 
            {
                int mid = l + r >> 1; 
                if(que[mid] < q[i]) r = mid; 
                else l = mid + 1;  
            }
            que[l] = q[i]; 
            len = max(l, len); 
        } 
    }
```

###### 问题四：最长不下降子序列（模板），其实该问题可以看成是反向的最长不升序序列。

```cpp
// 模板，最长不下降子序列：
que[0] = 0x3f3f3f3f; 
    int len = 0, res = 0; 
    g[0] = 2e9; 
    for(int i = n - 1; i >= 0; i -- ) 
    {
        // 最长降序子序列（可以相等） 
        int l = 0, r = len;
        if(que[len] >= q[i]) que[++len] = q[i]; 
        else 
        {
            while(l < r) 
            {
                int mid = l + r >> 1; 
                if(que[mid] < q[i]) r = mid; 
                else l = mid + 1;  
            }
            
            //
            que[l] = q[i]; 
            len = max(l, len); 
        }
        
    }
```

######  问题五、最长公共上升子序列：最长公共子序列 + 最长上升子序列，复杂度O(n * n); 

```
序列a[N], b[N]
状态表示：f[i][j], 表示的是对于a序列的前i个和b序列的前j个，并且以b[j]结尾的最长公共上升子序列的长度。
状态计算：
if(a[i] == b[j]) f[i][j] = max(f[i - 1][1-j - 1]) + 1; 
else f[i][j] = f[i - 1][j] 
```

```cpp
// 模板：
cin >> n; 
for(int i = 1; i <= n; i ++ ) 
    cin >> a[i]; 
for(int i = 1; i <= n; i ++ ) 
    cin >> b[i]; 
int maxv = 1; 
for(int i = 1; i <= n; i ++ ) {
    maxv = 1; 
    for(int j = 1; j <= n; j ++ ) 
    {
        f[i][j] = f[i - 1][j]; 
        if(a[i] == b[j]) f[i][j] = max(f[i][j], maxv);    
        if(b[j] < a[i]) maxv = max(maxv, f[i - 1][j] + 1); 
    }   
}
int ans = -INF; 
for(int i = 1; i <= n; i ++ ) ans = max(ans, f[n][i]); 
cout << ans << endl; 
return 0;  
```











