/**
 题目链接：https://leetcode.cn/problems/minimum-stability-factor-of-array/description/
 typescript 版本
 */

 function minStable(nums: number[], maxC: number): number {
  let n: number = nums.length 

  const rmq: Array<Array<number>> = new Array(n + 1).fill(0).map(item => {
    return new Array(20).fill(0)
  })

  for(let i = 0; i < n; ++ i ) rmq[i][0] = nums[i] 
  
  const gcd: (a: number, b: number) => number = (a, b) => {
    return b ? gcd(b, a % b) : a 
  }

  for(let i = 1; i < 20; ++ i ) {
    for(let j = 0; j + (1 << i) - 1 < n; ++ j ) {
      rmq[j][i] = gcd(rmq[j][i - 1], rmq[j + (1 << (i - 1))][i - 1])
    }
  }

  const getGcd: (l: number, r: number) => number = (l, r) => {
    let k = Math.floor(Math.log2(r - l + 1))
    return gcd(rmq[l][k], rmq[r - (1 << k) + 1][k])
  }

  const check: (mid: number) => boolean = (mid: number) => {
    ++ mid 
    let res = 0  
    for(let i = 0; i + mid - 1 < n; ++ i ) {
      let g = getGcd(i, i + mid - 1) 
      if(g >= 2) {
        res ++ 
        i = i + mid - 1 
      }
    }
    return res <= maxC 
  }

  let l = 0, r = n - 1 
  while(l < r) {
    let mid = (l + r) >> 1 
    if(check(mid)) r = mid 
    else l = mid + 1 
  }
  if(!check(l)) l = n 
  return l  
};