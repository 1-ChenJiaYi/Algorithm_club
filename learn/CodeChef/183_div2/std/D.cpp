#include<bits/stdc++.h> 
#define ff first 
#define ss second  
#define int long long 
#define all(x) x.begin(),x.end() 
using namespace std; 
using ll = long long; 
using PII = pair<int,int>; 
const int N = 1e6 + 10, mod = 2e9 + 7, P = 2313131;
ll n, m; 
int a[N]; 
void solve() {
    cin >> n >> m; 
    m = n * (n - 1) / 2 - m; 
    if(!m) {
        cout << n - 1 << endl;
        return; 
    } 
    ll cnt = 1, c = 2; 
    if(n == 2) {
        cout << 0 << endl;
        return; 
    }
    
    auto f = [](ll l, ll r) {
        if(l > r) return 0ll;
        ll cc = (r - l + 1); 
        ll res = (cc * l + cc * (cc - 1) / 2);  
        return res; 
    };
    
    
    ll l = 3, r = n; 
    
    if(cnt < m) { 
        while(l < r) {
            ll mid = l + r >> 1; 
            if(f(2ll, mid - 1) + cnt >= m) r = mid;
            else l = mid + 1; 
        }
        
        cnt += f(2, l - 1);
        c += l - 3 + 1; 
    }


    
    // cout << c << endl;
    ll ans=f(max(0ll, n - 1 - m), n - 1 - (c - 1)); 

    cout<<ans<<endl;
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