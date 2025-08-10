/**
 * https://codeforces.com/problemset/problem/2052/F 
 */

#include<bits/stdc++.h> 
#define int long long 
#define ff first 
#define ss second  
#define pb push_back 
#define endl '\n' 
using namespace std; 
using ll = long long; 
using PII=pair<int,int>; 
using T = pair<pair<int,int>,int>; 
const int N = 1e6+10, M = 5e4 + 10, mod = 1e9 + 7; 
int n,m,a[N],b[N]; 
int dp[N][3][3]; 

// void print(__int128 x) {
//     string s; 
//     while(x) {
//         s+=(x%10+'0'); 
//         x /= 10; 
//     }
//     reverse(s.begin(),s.end()); 
//     cout<<s;
// }
void solve() {
    string s1,s2;
    cin>>n>>s1>>s2;
    // n=2e5;
    // for(int i=1;i<=n;++i) s1+='.',s2+='.'; 
    for(int i=0;i<=n;++i)
        for(int j=0;j<=1;++j) 
            for(int k=0;k<=1;++k)
                dp[i][j][k] = 0; 
    s1=" "+s1;
    s2=" "+s2; 
    int f1,f2;
    if(s1[1]=='#') f1=1;
    else f1=0;
    
    if(s2[1]=='#') f2=1;
    else f2=0; 
    
    dp[1][f1][f2]=1;
    if(!f1 and !f2) {
        dp[1][1][1]=1;
    } 
    
    for(int i=2;i<=n;++i) {
        if(s1[i]=='#') f1=1;
        else f1=0;
    
        if(s2[i]=='#') f2=1;
        else f2=0; 
        
        if(!f1 and !f2) {
            dp[i][0][0]+=dp[i-1][1][1]; 
            dp[i][1][1]+=dp[i-1][0][0]+dp[i-1][1][1]; 
            dp[i][1][0]+=dp[i-1][0][1]; 
            dp[i][0][1]+=dp[i-1][1][0]; 
        } 
        else if(f1 and f2) {
            dp[i][1][1]+=dp[i-1][1][1];  
        }
        else if(!f1 and f2) {
            dp[i][0][1]+=dp[i-1][1][1]; 
            dp[i][1][1]+=dp[i-1][0][1]; 
        }
        else if(f1 and !f2){
            dp[i][1][0]+=dp[i-1][1][1]; 
            dp[i][1][1]+=dp[i-1][1][0]; 
        }
        
        for(int j=0;j<=1;++j)
            for(int k=0;k<=1;++k) 
                dp[i][j][k]=min(2ll, dp[i][j][k]); 
    }
    
    if(dp[n][1][1]==0) cout<<"None"<<endl;
    else if(dp[n][1][1]>1) cout<<"Multiple"<<endl;
    else cout<<"Unique"<<endl;
}

signed main() {
    ios::sync_with_stdio(false); cin.tie(0); cout.tie(0); 
	int ts = 1; 
	cin>>ts;
	while(ts--) solve();    
	return 0; 
}
