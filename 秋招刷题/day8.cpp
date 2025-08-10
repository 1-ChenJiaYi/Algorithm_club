/**
  https://leetcode.cn/problems/threshold-majority-queries/
*/

class Solution {
  public:
  using PII = pair<int, int>; 
  #define x first 
  #define y second 
  
  static const int N = 1e4; 
  PII dp[2][N]; 
  vector<int> subarrayMajority(vector<int>& a, vector<vector<int>>& queries) {
      int n = a.size();
      unordered_map<int, int> hsh, _h;
      int idx = 0;
      vector<int> b = a; 
      sort(b.begin(), b.end()); 
      for(auto t: b) {
          if(!hsh[t]) {
              hsh[t] = ++ idx; 
              _h[idx] = t; 
          }
      }
      for(auto& t: a) t = hsh[t]; 
  
      vector<vector<int>> q;
  
      int _i = 0; 
      vector<int> ans(queries.size(), -1);
      for(auto& t: queries) {
          q.push_back({
              t[0], t[1], t[2], _i
              });
          _i ++; 
      }
      sort(q.begin(), q.end()); 
  
      vector<vector<tuple<int, int, int>>> uslist(n);
      for(auto& t: q) {
          uslist[t[0]].emplace_back(t[1], t[2], t[3]);
      }
      vector<int> po(n, 0);
  
      for(int i = 0; i < n; ++i) {
          dp[1][i] = {a[i], 1}; 
          while(po[i] < uslist[i].size() && get<0>(uslist[i][po[i]]) == i) {
              if(get<1>(uslist[i][po[i]]) <= 1) {
                  ans[get<2>(uslist[i][po[i]])] = a[i]; 
              }
              po[i]++;
          }
      } 
  
      for(int i = 0; i < n; ++i) {
          vector<int> mp(idx + 1, 0);
          mp[a[i]] = 1;
          for(int le = 2; i + le - 1 < n; ++le) {
              PII& u = dp[(le - 1) % 2][i]; 
              int cur = u.y; 
              mp[a[i + le - 1]]++;
              int lst = mp[a[i + le - 1]];
              PII ed;
              if(lst > cur || (lst == cur && a[i + le - 1] <= u.x)) {
                  ed = {a[i + le - 1], lst};
              }
              else {
                  ed = u;
              }
              dp[le % 2][i] = ed; 
  
              while(po[i] < uslist[i].size() && get<0>(uslist[i][po[i]]) == i + le - 1) {
                  if(ed.y >= get<1>(uslist[i][po[i]])) {
                      ans[get<2>(uslist[i][po[i]])] = ed.x;
                  }
                  po[i]++;
              }
          }
      }
  
      for(auto& t: ans) {
          if(t != -1) {
              t = _h[t];
          }
      }
      return ans;
  }
  };