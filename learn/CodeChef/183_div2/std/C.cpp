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
    string s, t; 
    cin >> n >> s >> t; 
    vector<int> ans; 
    for(int i = 0; i < n; ++ i ) {
        if(s[i] == '1' and i + 1 < n and s[i + 1] == '0') {
            ans.push_back(i + 1); 
            s[i + 1] = '1'; 
        }
    }
    for(int i = n - 1; i >= 0; -- i ) {
        if(s[i] != t[i]) {
            if(i - 1 >= 0 and s[i - 1] == '1') {
                ans.push_back(i);
            }
            else {
                cout << -1 << endl;
                return; 
            }
        }
    }
    
    cout << ans.size() << endl;
    for(int &v: ans) cout << v << ' '; 
    cout << endl;
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