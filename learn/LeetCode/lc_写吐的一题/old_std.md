吐槽：

难受的一场，前三题很快就秒了，第三题dp调了一下，第四题直接写死了，写了200行，快赶上splay的码量了，难绷。第四题赛后5分钟后过了，奇耻大辱的模拟题。

思路是对的，但是编码很纯（有些地方处理的也有点纯，int128那里其实没必要加，可以优化掉），后续会优化一下思路，这个星期脑子有点宕机。



题解：

很显然要从第一个数开始决策，看有多少个方案比他少，从第一个可以填的数字开始看（从小到大），第一次>=k的时候，那个位置就是要填的数。(1)

就是先根据n的情况分奇数偶数，奇数的情况是比较简单的，必须第一个数填奇数，剩下的交替填写；

偶数，根据(1)先把第一个数找到，剩下的其实就是n为奇数的解。



```cpp
class Solution {
public:
    using ll = long long; 

    bool check(ll n, ll k) {

        ll c1 = n / 2, c2 = n / 2; 
        if(n % 2 == 0) {
            ll s = 1; 
            while(c1) {
                s *= c1; 
                if(s >= k) return true; 
                c1 -= 1; 
            }
            while(c2) {
                s *= c2; 
                if(s >= k) return true; 
                c2 -= 1; 
            }
            s *= 2; 
            
            return k<=s;
        }
        ll s = 1; 
        while(c1) {
            s *= c1; 
            if(s >= k) return true; 
            c1 -= 1; 
        }
        while(c2) {
            s *= c2; 
            if(s >= k) return true; 
            c2 -= 1; 
        }
        s *= (n / 2 + 1);  
        // cout<<n<<' '<<k<<endl;
        return k <= s; 
        
    }
    ll f(ll y) {
        __int128 x = 1; 
        while(y) {
            x = x * y;
            x = min(__int128(1e15 + 1), x);  
            y -= 1;
        }
        return (ll)x;
    }
    vector<int> permute(int n, long long k) {
        if(!check(n, k)) return {};
        
        set<int> js, os; 
        for(int i = 1; i <= n; ++ i )
            if(i % 2) js.insert(i); 
            else os.insert(i);
        if(n % 2) {
            vector<int> ans; 
            while(n) {
                ll oc = os.size(), jc = js.size(); 
                if(n == 1) {
                    if(os.size()) ans.push_back(*os.begin()); 
                    else ans.push_back(*js.begin()); 
                    return ans; 
                }
                if(n % 2) {
                    __int128 cnt = 0; 
                    int u = 0; 
                    for(int i = 1; i <= jc; ++ i ) {
                        cnt += __int128(f(jc - 1)) * f(oc);   
                        if(cnt >= k) {
                            u = i; 
                            k -= (cnt - __int128(f(jc - 1)) * f(oc));    
                            break; 
                        } 
                    } 
                    // cout<<u<<endl;
                    int c = 0, aim = 0; 
                    while(1) {
                        if(c == 0) aim = *js.begin(); 
                        else aim = *js.upper_bound(aim); 
                        c+=1;
                        if(c == u) break; 
                    }
                    jc -= 1; 
                    js.erase(aim); 
                    // cout<<"aim ="<<aim<<endl;
                    ans.push_back(aim); 
                }
                else {
                    __int128 cnt = 0; 
                    int u = 0; 
                    for(int i = 1; i <= oc; ++ i ) {
                        cnt += __int128(f(oc - 1)) * f(jc);   
                        if(cnt >= k) {
                            u = i; 
                            k -= (cnt - __int128(f(oc - 1)) * f(jc));     
                            break; 
                        } 
                    } 
                    int c = 0, aim = 0; 
                    while(1) {
                        if(c == 0) aim = *os.begin(); 
                        else aim = *os.upper_bound(aim); 
                        c+=1;
                        if(c == u) break; 
                    }
                    oc -= 1; 
                    os.erase(aim); 
                    ans.push_back(aim); 
                }
                n -= 1; 
            }

            
        }
        else {
            vector<int> ans; 
            ll oc = os.size(), jc = js.size(); 
            __int128 tm = __int128(f(n / 2 - 1)) * f(n / 2), cnt = 0, u = 0; 
            for(int i = 1; i <= n; ++ i ) {
                cnt += tm; 
                if(cnt >= k) {
                    u=i; 
                    k -= (cnt - tm); 
                    break; 
                }
            }
            ans.push_back(u); 
            if(u % 2) js.erase(u);
            else os.erase(u); 
            n -= 1;
            int ft = 0; 
            if(u % 2) ft = 0;
            else ft = 1; 
            while(n) {
                ll oc = os.size(), jc = js.size(); 
                if(n == 1) {
                    if(ft) ans.push_back(*js.begin()); 
                    else ans.push_back(*os.begin()); 
                    return ans; 
                }
                if(ft) {
                    __int128 cnt = 0; 
                    int u = 0; 
                    for(int i = 1; i <= jc; ++ i ) {
                        cnt += __int128(f(jc - 1)) * f(oc);   
                        if(cnt >= k) {
                            u = i; 
                            k -= (cnt - __int128(f(jc - 1)) * f(oc));    
                            break; 
                        } 
                    } 
                    // cout<<u<<endl;
                    int c = 0, aim = 0; 
                    while(1) {
                        if(c == 0) aim = *js.begin(); 
                        else aim = *js.upper_bound(aim); 
                        c+=1;
                        if(c == u) break; 
                    }
                    jc -= 1; 
                    js.erase(aim); 
                    // cout<<"aim ="<<aim<<endl;
                    ans.push_back(aim); 
                }
                else {
                    __int128 cnt = 0; 
                    int u = 0; 
                    for(int i = 1; i <= oc; ++ i ) {
                        cnt += __int128(f(oc - 1)) * f(jc);   
                        if(cnt >= k) {
                            u = i; 
                            k -= (cnt - __int128(f(oc - 1)) * f(jc));     
                            break; 
                        } 
                    } 
                    int c = 0, aim = 0; 
                    while(1) {
                        if(c == 0) aim = *os.begin(); 
                        else aim = *os.upper_bound(aim); 
                        c+=1;
                        if(c == u) break; 
                    }
                    oc -= 1; 
                    os.erase(aim); 
                    ans.push_back(aim); 
                }
                n -= 1; 
                ft = 1-ft;
            }
            
        }

        return {}; 
    }
};
```

