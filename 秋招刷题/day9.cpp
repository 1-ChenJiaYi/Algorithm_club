/**
https://codeforces.com/problemset/problem/2126/D
*/

#include<bits/stdc++.h>
#define int long long 
#define x first 
#define y second 
using namespace std; 
using PII = pair<int, int>; 
constexpr int N = 1e5 + 10; 

int n, k; 
int l[N], r[N], e[N]; 

void solve() {
    cin >> n >> k; 
    vector<PII> v; 
    for(int i = 1; i <= n; ++ i ) {
        cin >> l[i] >> r[i] >> e[i];
        v.push_back({l[i], i}); 
    }
    sort(v.begin(), v.end(), [](PII& a, PII& b) {
        if(l[a.y] != l[b.y]) return l[a.y] < l[b.y]; 
        return r[a.y] > r[b.y];  
    });
    
    set<int> se; 
    se.insert(k);
    for(auto& t: v) {
        int ul = l[t.y], ur = r[t.y], es = e[t.y]; 
        auto f = se.lower_bound(ul);
        if(f != se.end() && (*f) >= ul && (*f) <= ur) {
            se.insert(es); 
        }
    }
    
    auto res = se.end();
    res = prev(res); 
    
    cout << (*res) << endl;
}


signed main() {
    ios::sync_with_stdio(false); 
    cin.tie(0); 
    cout.tie(0); 
    int ts = 1; 
    cin >> ts;
    while(ts -- ) solve(); 
    return 0; 
}