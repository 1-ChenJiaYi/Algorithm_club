#include<bits/stdc++.h> 
#define ff first 
#define ss second  
#define int long long 
#define all(x) x.begin(),x.end() 
using namespace std; 
using ll = long long; 
using PII = pair<int,int>; 
const int N = 1e6 + 10, mod = 2e9 + 7, P = 2313131;

int n, m; 
int a[N]; 

void solve() {
    cin >> n; 
    vector<PII> v; 
    for(int i = 1; i <= n; ++ i ) cin >> a[i]; 
    for(int i = 1; i <= n; ++ i ) 
        for(int j = i + 1; j <= n; ++ j ) {
            if(a[i] != a[j]) {
                int mx = max(a[i], a[j]), mn = min(a[i], a[j]); 
                if(mn + 1 < mx) v.push_back({mn + 1, mx - 1});
            }
        }
    sort(all(v)); 
    int e = 0, ans = 0; 
    for(int i = 0; i < v.size(); ++ i ) {
        int l = v[i].ff, r = v[i].ss; 
        if(e < l) {
            ans += (r - l + 1); 
        }
        else if(e < r) {
            ans += (r - max(e + 1, l) + 1);
        }
        e = max(e, r); 
    }
    cout << ans << endl;
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