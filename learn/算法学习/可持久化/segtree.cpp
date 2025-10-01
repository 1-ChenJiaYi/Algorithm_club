/**
  link: https://www.acwing.com/problem/content/257/
*/
#include<bits/stdc++.h> 
using namespace std; 
const int N = 1e5 + 10; 
int n, m; 
int a[N]; 
int root[N]; 
int idx; 
struct node {
    int l, r; 
    int cnt; 
}tr[N * 4 + N * 20]; 

vector<int> nums; 
int find(int x) {
    return lower_bound(nums.begin(), nums.end(), x) - nums.begin(); 
}

int build(int l, int r) {
    int p = ++ idx;
    if(l == r) return p;
    int mid = l + r >> 1; 
    tr[p].l = build(l, mid); 
    tr[p].r = build(mid + 1, r); 
    return p; 
}

void push_up(int u) {
    tr[u].cnt = tr[tr[u].l].cnt + tr[tr[u].r].cnt;
} 
int insert(int ls, int l, int r, int x) {
    int p = ++ idx; 
    tr[p] = tr[ls]; 
    if(l == r) {
        tr[p].cnt ++; 
        return p; 
    }
    int mid = l + r >> 1; 
    if(x <= mid) tr[p].l = insert(tr[ls].l, l, mid, x); 
    else tr[p].r = insert(tr[ls].r, mid + 1, r, x); 
    push_up(p);
    return p;
}

int query(int cr, int cl, int l, int r, int k) {
    if(l == r) return l;
    int mid = l + r >> 1; 
    int cn = tr[tr[cr].l].cnt - tr[tr[cl].l].cnt;
    if(cn >= k) return query(tr[cr].l, tr[cl].l, l, mid, k);
    else return query(tr[cr].r, tr[cl].r, mid + 1, r, k - cn);
}
int main() {
    scanf("%d%d", &n, &m); 
    for(int i = 1; i <= n; ++ i ) {
        scanf("%d", &a[i]);
        nums.push_back(a[i]); 
    }
    sort(nums.begin(), nums.end()); 
    nums.erase(unique(nums.begin(), nums.end()), nums.end()); 
    
    root[0] = build(0, nums.size() - 1);

    for(int i = 1; i <= n; ++ i ) {
        root[i] = insert(root[i - 1], 0, nums.size() - 1, find(a[i])); 
    }
    
    while(m -- ) {
        int l, r, k; 
        scanf("%d%d%d", &l, &r, &k); 
        printf("%d\n", nums[query(root[r], root[l - 1], 0, nums.size() - 1, k)]);
    }
    return 0; 
}
