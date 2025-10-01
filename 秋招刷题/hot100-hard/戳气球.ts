/**
hot100
author: code__ccc 
date: 2025/10/02
link: https://leetcode.cn/problems/burst-balloons/?envType=problem-list-v2&envId=2cktkvj
*/
var max = (...a) => Math.max(...a) 
var min = (...a) => Math.min(...a) 
var clg = (...a) => console.log(...a) 
var zs = (a) => Math.floor(a)
var db = (a) => a*1.00
const _tozs = i => zs(i) 
var gn = (a) => a.split(' ').filter(i => i !== '\n').map(_tozs)[0] 
var gl = (a) => a.split(' ').filter(i => i !== '\n').map(_tozs) 
var lowSort = (a) => a.sort( (x, y) => (x - y) )
var upSort = (a) => a.sort( (x, y) => (y - x) ) 
var sum = (a) => a.reduce((s, i) => (s + i), 0)
var amr = (...x) => {
  x = Array.from(x)
  let v0 = zs(x[x.length - 1])
  const dfs = (nx, i) => {
      if(i === x.length - 1) return 
      for(let j = 0; j < x[i]; ++ j ) 
          if(i < x.length - 2) nx.push([])
          else nx[j] = v0
      if(i + 1 < x.length - 1) 
          for(const ls of nx) dfs(ls, i + 1) 
  }
  const res = []
  dfs(res, 0)
  return res
} 


/**
    dp[i][j]: 以i为左边界，以j为右边界的方案。
    dp[i][j] = dp[i][k-1]+dp[k+1][j]+a[k]*a[i]*a[j]
*/
function maxCoins(a: number[]): number {
    let n = a.length 
    a = [1, ...a, 1] 
    const dp: any = amr(n + 2, n + 2, 0)
    
    let mx = 0
   
    for(let le = 1; le <= n + 1; ++ le ) {
        // l, l + le - 1 
        for(let l = 0; l + le <= n + 1; ++ l ) {
            let r = l + le; 
            for(let k = l + 1; k <= r - 1; ++ k ) {
                dp[l][r] = max(dp[l][r], dp[l][k] + dp[k][r] + a[k] * a[l] * a[r]) 
                mx = max(mx, dp[l][r])
            }
        }
    }

    // clg(dp)
    return mx 
};