/**
  https://ac.nowcoder.com/acm/contest/114111/G
*/

#include<bits/stdc++.h> 
#define int long long 
using namespace std; 

using i128 = __int128; 
constexpr int N = 3e5 + 10, mod = 2e9 + 7; 

int n, q; 
i128 dp[N], hsh[N]; 
i128 s[N]; 

void print(i128 x) {
    string s; 
    while(x) { 
        s += ((x % i128(10)) + '0'); 
        x /= 10; 
    }
    reverse(s.begin(), s.end()); 
    cout<<s<<endl;
}
void solve() { 
    scanf("%lld%lld", &n, &q); 
    for(int i = 1, x; i <= n; ++ i ) {
        scanf("%lld", &x); 
        s[i] = s[i - 1] + hsh[x];
    }
//     print(s[2]);
    while(q -- ) {
        int l, r; 
        scanf("%lld%lld", &l, &r); 
//         print(s[r] - s[l - 1]); 
//         print(dp[r - l + 1]);
//         cout << s[r] - s[l - 1] << x' ' << dp[r - l + 1] << endl;
        if((r - l + 1) % 2 == 0 and 
           s[r] - s[l - 1] == dp[(r - l + 1) / 2]) {
            puts("Yes"); 
        }
        else puts("No"); 
    }
}
signed main() {
    std::random_device rd;
    std::mt19937_64 gen(rd());
    for(int i = 1; i < N; ++ i ) 
        hsh[i] = gen(); 
//     print(hsh[1]);
    for(int i = 1; i < N; ++ i ) 
       dp[i] = dp[i - 1] + hsh[i];
    for(int i = 1; i < N; ++ i ) dp[i] *= i128(2);
    int ts = 1; 
//     scanf("%lld", &ts); 
    
    while(ts -- ) solve(); 
    return 0; 
}
