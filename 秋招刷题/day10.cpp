/**
  https://leetcode.cn/problems/fruits-into-baskets-iii/?envType=daily-question&envId=2025-08-06
*/

class Solution {
  public:
  
      void push_up(int u, vector<int>& va) {
          va[u] = min(va[u * 2], va[u * 2 + 1]);
      }
      void build(int u, int l, int r, vector<int>& va, vector<int>& la, vector<int>& ra, vector<int>& fu) {
          la[u] = l, ra[u] = r; 
          if(l == r) {
              va[u] = fu[l - 1]; 
              return; 
          }
  
          int mid = (l + r) / 2; 
          build(u * 2, l, mid, va, la, ra, fu); 
          build(u * 2 + 1, mid + 1, r, va, la, ra, fu); 
          push_up(u, va); 
  
      }
  
      void modify(int u, int p, int ai, vector<int>& va, vector<int>& la, vector<int>& ra) {
          int l = la[u], r = ra[u]; 
          if(l == r && l == p) {
              va[u] = ai;   
              return; 
          }
          int mid = (l + r) / 2; 
          if(p <= mid) {
              modify(u * 2, p, ai, va, la, ra); 
          }
          else {
              modify(u * 2 + 1, p, ai, va, la, ra); 
          }
          push_up(u, va); 
      }
  
      int query(int u, int ul, int ur, vector<int>& va, vector<int>& la, vector<int>& ra) {
          int l = la[u], r = ra[u];
          if(l >= ul && r <= ur) {
              return va[u]; 
          }
          int mid = (l + r) / 2; 
          int res = 1e9; 
          if(ul <= mid) res = min(res, query(u * 2, ul, ur, va, la, ra));
          if(ur > mid) res = min(res, query(u * 2 + 1, ul, ur, va, la, ra));
          return res;
      }
      int numOfUnplacedFruits(vector<int>& fruits, vector<int>& baskets) {
          vector<int> v;
          for(int i = 0; i < fruits.size(); ++ i ) v.push_back(i);
          sort(v.begin(), v.end(), [&](int& i1, int& i2) {
              return fruits[i1] < fruits[i2];
          });
          sort(fruits.begin(), fruits.end()); 
          int n = fruits.size(), m = baskets.size(); 
          vector<int> mp(n, 0); 
          for(int i = 0; i < v.size(); ++ i ) mp[v[i]] = i;
          vector<int> va(n * 4 + 2, 0); 
          vector<int> la(n * 4 + 2, 0); 
          vector<int> ra(n * 4 + 2, 0); 
          build(1, 1, n, va, la, ra, v);
          int res = n; 
          for(auto& c: baskets) {
              int l = 0, r = fruits.size() - 1; 
              while(l < r) {
                  int mid = (l + r + 1) / 2; 
                  if(fruits[mid] <= c) l = mid;
                  else r = mid - 1; 
              }
              if(fruits[l] > c) {
                  continue;
              }
              // cout<<l+1<<' '<<n<<endl;
              // cout << "debug: " << l << ' ' << fruits[l] << endl;
              int mn = query(1, 1, l + 1, va, la, ra); 
              // cout<<"debug: " << mn << endl;
              if(mn != 1e9) {
                  res --; 
                  modify(1, mp[mn] + 1, 1e9, va, la, ra); 
              }
          }
  
          return res;
      }
  };