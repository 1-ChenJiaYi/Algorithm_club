/**
 link: https://www.acwing.com/problem/content/258/
*/
#include<bits/stdc++.h> 
using namespace std; 

const int N = 6e5 + 10, M = N * 25; 
int n, m; 
int a[N], s[N]; 
int son[M][2], idx; 
int root[N];
int max_id[M]; 

void insert(int i, int bit, int p, int q) {
    if(bit < 0) {
        max_id[p] = i; 
        return; 
    }
    int b = s[i] >> bit & 1; 
    if(q) son[p][b ^ 1] = son[q][b ^ 1]; 
    son[p][b] = ++ idx; 
    insert(i, bit - 1, son[p][b], son[q][b]); 
    max_id[p] = max(max_id[son[p][1]], max_id[son[p][0]]);
}

int query(int p, int v, int L) {
    for(int i = 23; i >= 0; -- i ) {
        int bit = v >> i & 1; 
        if(max_id[son[p][bit^1]] >= L) {
            p = son[p][bit^1];
        }  
        else p = son[p][bit]; 
    }
    return s[max_id[p]] ^ v; 
}

int main() {
    scanf("%d%d", &n, &m); 
    max_id[0] = -1; 
    root[0] = ++ idx; 
    insert(0, 23, root[0], 0); 
    
    for(int i = 1; i <= n; ++ i ) {
        scanf("%d", &a[i]); 
        s[i] = s[i - 1] ^ a[i]; 
        root[i] = ++ idx; 
        insert(i, 23, root[i], root[i - 1]); 
    }
    
    while(m -- ) {
        char op[2]; 
        scanf("%s", op); 
        if(*op == 'Q') {
            int l, r, x; 
            scanf("%d%d%d", &l, &r, &x); 
            printf("%d\n", query(root[r - 1], x ^ s[n], l - 1)); 
        }
        else {
            int x; 
            scanf("%d", &x); 
            ++ n;
            a[n] = x; 
            s[n] = s[n - 1] ^ x;
            root[n] = ++ idx; 
            insert(n, 23, root[n], root[n - 1]);
        }
    }
    return 0; 
}
