

# 数位DP(基于树的分叉考虑情况的数位dp)： 

##### 知识点1：树形的思考方式:

每一位都是取1-(x - 1)，然后留下x，考虑下一位数，last是上一个节点，也就是这一个样子：

​                    last 

​                   /       \

​          0 - x - 1      x 

以此类推。

模板题：[1081. 度的数量 - AcWing题库](https://www.acwing.com/problem/content/description/1083/),  求的是l到r之间B的整次幂恰好有k个的方案数。

###### 模板（杨辉三角求组合数) ： 

```cpp
void init() 
{
    // 杨辉三角形求组合数模板： 
    for(int i = 0; i < N ; i ++ ) 
        for(int j = 0; j <= i; j ++ ) 
            if(!j) C[i][j] = 1; 
            else C[i][j] = C[i - 1][j] + C[i - 1][j - 1];  
}
```

###### 数位dp模板：

```cpp
// 模板： 
#include <iostream> 
#include <algorithm> 
#include <cstdio> 
#include <cstring>
#include <vector> 
#define pb push_back 
using namespace std; 
const int N = 35; 
int n, m, k, B;  
int C[N][N]; 
void init() 
{
    // 杨辉三角形求组合数模板： 
    for(int i = 0; i < N ; i ++ ) 
        for(int j = 0; j <= i; j ++ ) 
            if(!j) C[i][j] = 1; 
            else C[i][j] = C[i - 1][j] + C[i - 1][j - 1];  
}
// get()
int get(int x) 
{
    if(!x) return 0; 
    vector<int> nums; 
    while(x) nums.pb(x % B), x /= B;
    int last = 0, ans = 0;    
    for(int i = nums.size() - 1; i >= 0; i -- ) 
    {
        int x = nums[i]; 
        if(last > k) break; 
        if(x) 
        {
            ans += C[i][k - last]; 
            if(x == 1) last ++; 
            else if(x > 1) 
            {
                if(k - last - 1 >= 0) ans += C[i][k - last - 1]; 
                break; 
            }
        }
        else if(!i && last == k) ans ++; 
    }   
    return ans; 
}
int main() 
{
    init(); 
    int l, r; 
    cin >> l >> r >> k >> B; 
    cout << get(r) - get(l - 1) << endl;  
    return 0; 
}
```

题意：找到l到r中所有不降数的数目，不降数必须满足从大到小数位满足：x1 <= x2 <= x3..... 

数位dp的步骤：

1、找到数字之间的"逻辑DP"，预处理dp数组

2、做数位dp规划。

3、区间思考：一般来说，求[l, r]之间的方案等价于求[0, r] - [0, l - 1]的方案数。

###### 题1: [1082. 数字游戏 - AcWing题库](https://www.acwing.com/problem/content/description/1084/)

f(i, j), 表示的是i位数字，最高位第i位数字是j的方案。

状态转移：f(i, j) += f(i - 1, k) (k>=j) 

```cpp
// 预处理DP数组
void init() 
{
    for(int i = 1; i <= 9; i ++ ) 
        f[1][i] = 1; 
    for(int i = 2; i < N; i ++ ) 
        for(int j = 0; j <= 9; j ++ ) 
            for(int k = j; k <= 9; k ++ ) 
                f[i][j] += f[i - 1][k];   
}
// 数位dp
int get(int x) 
{
    if(!x) return 0; 
    vector<int> nums; 
    while(x) nums.pb(x % 10), x /= 10; 
    int last = 0, ans = 0;
    for(int i = nums.size() - 1; i >= 0; i -- ) 
    {
        int x = nums[i]; 
        if(x < last) break; 
        else if(x > last)  
        {
            for(int c = last; c < x; c ++ )
                ans += f[i + 1][c]; 
        }
        last = x; 
        if(!i) ans ++;  
    }
    return ans; 
}
```

###### 题2：[1083. Windy数 - AcWing题库](https://www.acwing.com/problem/content/description/1085/)

1、题意：Windy 定义了一种 Windy 数：不含前导零且相邻两个数字之差至少为 2 的正整数被称为 Windy 数。

Windy 想知道，在 A和 B之间，包括 A 和 B，总共有多少个 Windy 数？

2、预处理dp数组：f(i, j)，表示的是i位数字， 最高位是j的windy数的方案数。

状态转移：f(i, j) += f(i, k) (abs(j - k) >= 2) 

```cpp
// 预处理dp数组：
void init() 
{
    // dp数组的含义：
    // f[i][j], i位数字，最高位数字为j的方案数 
    for(int i = 0; i <= 9; i ++ ) 
        f[1][i] = 1; 
    for(int i = 2; i < N; i ++ ) 
        for(int j = 0; j <= 9; j ++ ) 
        {
            for(int k = 0; k <= 9; k ++ ) 
                if(abs(j - k) >= 2) f[i][j] += f[i - 1][k]; 
        }
}
// 数位dp：
int get(int x) 
{
    if(!x) return 0; 
    vector<int> nums; 
    while(x) nums.pb(x % 10), x /= 10; 
    int last = -10, ans = 0; 
    for(int i = nums.size() - 1; i >= 0; i -- ) 
    {
        int x = nums[i]; 
        for(int c = (i == nums.size() - 1); c < x; c ++ ) 
            if(abs(c - last) >= 2) 
                ans += f[i + 1][c]; 
        
        if(abs(x - last) < 2) break;
        if(!i) ans ++; 
        last = x; 
    }
    for(int i = 1; i < nums.size(); i ++ ) 
        for(int j = 1; j <= 9; j ++ ) 
            ans += f[i][j]; 
    return ans; 
}
```

###### 题三：[1084. 数字游戏 II - AcWing题库](https://www.acwing.com/problem/content/description/1086/)

题意：由于科协里最近真的很流行数字游戏, 某人又命名了一种取模数，这种数字必须满足各位数字之和 mod N为 0，现在大家又要玩游戏了，指定一个整数闭区间 [a.b][�.�]，问这个区间内有多少个数满足条件。 

#define mod(x) ((x%n+n)%n)

DP数组预处理：f(i, j, k):  表示的是i位数字，且最高位是j，并且数字模n等于k。

DP转移：f(i, j, k) += f(i, c, mod(k - j))

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstring> 
#include <cstdio> 
#include <vector> 
#define pb push_back 
#define int long long 
#define mod(x) ((x%n+n)%n)
using namespace std; 
const int N = 35, INF = 0x3f3f3f3f; 
int n, m; 
int f[N][N][101]; 
// 预处理DP数组：
// f[i][j][k]: 表示的是i位数字，且最高位是j，并且数字模n等于k。
void init() 
{
    memset(f, 0, sizeof f); 
    for(int i = 0; i <= 9; i ++ ) 
        f[1][i][mod(i)] = 1; 
    for(int i = 2; i < N; i ++ ) 
        for(int j = 0; j <= 9; j ++ ) 
        {
            for(int t = 0; t < n; t ++ )
                for(int c = 0; c <= 9; c ++ )
                f[i][j][t] += f[i - 1][c][mod(t - j)]; 
        }
}
int get(int x) 
{
    if(!x) return 1; 
    vector<int> nums; 
    while(x) nums.pb(x % 10), x /= 10; 
    int last = 0, ans = 0; 
    for(int i = nums.size() - 1; i >= 0; i -- ) 
    {
        int x = nums[i]; 
        for(int c = 0; c < x; c ++ )    // 决策0 - x - 1的所有数字。
            ans += f[i + 1][c][mod(-last)];  
        
        last += x; 
        if(!i && mod(last) == 0) ans ++;  // 如果与上一位不匹配，当前树不能继续分叉 
    }
    return ans; 
}
signed main() 
{
    
    int l, r; 
    while(cin >> l >> r >> n) 
    {
        init(); 
        cout << (get(r) - get(l - 1))<< endl; 
    }
    return 0; 
}
void init() 
{
    memset(f, 0, sizeof f); 
    for(int i = 0; i <= 9; i ++ ) 
        f[1][i][mod(i)] = 1; 
    for(int i = 2; i < N; i ++ ) 
        for(int j = 0; j <= 9; j ++ ) 
        {
            for(int t = 0; t < n; t ++ )
                for(int c = 0; c <= 9; c ++ )
                f[i][j][t] += f[i - 1][c][mod(t - j)]; 
        }
}
int get(int x) 
{
    if(!x) return 1; 
    vector<int> nums; 
    while(x) nums.pb(x % 10), x /= 10; 
    int last = 0, ans = 0; 
    for(int i = nums.size() - 1; i >= 0; i -- ) 
    {
        int x = nums[i]; 
        for(int c = 0; c < x; c ++ ) 
            ans += f[i + 1][c][mod(-last)]; 
        last += x; 
        if(!i && mod(last) == 0) ans ++; 
    }
    return ans; 
}
```

###### 题四：[1085. 不要62 - AcWing题库](https://www.acwing.com/problem/content/1087/)

题意：给定一个车牌，不能包含4和连续在一起的"62", 求l到r内的所有满足条件的方案数。

题解：

1、DP数组预处理：f(i, j)，表示的是i位数字，且最高位是j的满足条件的数字的方案数。

```cpp
bool check(int i1, int i2) 
{
    if(i1 == 4 || i2 == 4) return 0; 
    if(i1 == 6 && i2 == 2) return 0; 
    return 1; 
}
void init() 
{
    for(int i = 0; i <= 9; i ++ ) 
        f[1][i] = 1; 
    for(int i = 2; i < N; i ++ ) 
        for(int i1 = 0; i1 <= 9; i1 ++ ) 
            for(int i2 = 0; i2 <= 9; i2 ++ ) 
                if(check(i1, i2)) 
                    f[i][i1] += f[i - 1][i2]; 
}
```

2、DP数组的转移：f(i, j) += f(i - 1, k) (check(j, k) == 1) 

```cpp
bool check(int i1, int i2) 
{
    if(i1 == 4 || i2 == 4) return 0; 
    if(i1 == 6 && i2 == 2) return 0; 
    return 1; 
}
```

3、代码模板：

```cpp
#include <iostream> 
#include <algorithm> 
#include <cstring> 
#include <cstdio> 
#include <vector> 
#define pb push_back 
using namespace std; 
const int N = 15, INF = 0x3f3f3f3f; 
int n, m;
int f[N][N]; 
bool check(int i1, int i2) 
{
    if(i1 == 4 || i2 == 4) return 0; 
    if(i1 == 6 && i2 == 2) return 0; 
    return 1; 
}
//  dp数组预处理 
void init() 
{
    for(int i = 0; i <= 9; i ++ ) 
        f[1][i] = 1; 
    for(int i = 2; i < N; i ++ ) 
        for(int i1 = 0; i1 <= 9; i1 ++ ) 
            for(int i2 = 0; i2 <= 9; i2 ++ ) 
                if(check(i1, i2)) 
                    f[i][i1] += f[i - 1][i2]; 
}
// 数位dp处理 
int get(int x) 
{
    if(!x) return 0; 
    vector<int> nums; 
    while(x) nums.pb(x % 10), x /= 10; 
    int last = 0, ans = 0; 
    for(int i = nums.size() - 1; i >= 0; i -- ) 
    {
        int x = nums[i]; 
        for(int j = 0; j < x; j ++ ) 
            if(check(last, j)) ans += f[i + 1][j]; 
        if(!check(last, x)) break; 
        last = x; 
        if(!i) ans ++; 
    }
    return ans - 1;  
}
int main() 
{
    init(); 
    int l, r; 
    while(cin >> l >> r, l || r) 
        cout << get(r) - get(l - 1) << endl; 
    return 0; 
}
```

























