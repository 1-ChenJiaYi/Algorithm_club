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


void solve() {
    cin >> n; 
    int mx = -1;
    for(int i=n;i>=n-10 and i >= 3;--i) {
        for(int j=i-1;j>=2;--j) {
            if(i < j + j - 1) {
                mx = max(mx, j * 2 - 1 + i); 
                break; 
            }
        }    
    }
    
    cout << mx << endl;
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