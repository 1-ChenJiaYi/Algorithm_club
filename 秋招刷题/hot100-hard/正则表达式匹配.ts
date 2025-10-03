var max = (...a) => Math.max(...a) 
var min = (...a) => Math.min(...a) 
var clg = (...a) => console.log(...a) 
var zs = (a: number) => Math.floor(a)
var db = (a) => a*1.00
const _tozs = i => zs(i) 
var gn = (a) => a.split(' ').filter(i => i !== '\n').map(_tozs)[0] 
var gl = (a) => a.split(' ').filter(i => i !== '\n').map(_tozs) 
var lowSort = (a) => a.sort( (x, y) => (x - y) )
var upSort = (a) => a.sort( (x, y) => (y - x) ) 
var sum = (a) => a.reduce((s, i) => (s + i), 0)
var len = (a: string | Array<any>) => a.length 
var qc = (a: Array<any>) => Array.from(new Set(a))
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
function isMatch(s: string, p: string): boolean {
    const m = len(s)
    const pp: Array<any> = ['']
    for(let i = 0; i < len(p); ++ i ) {
        if(i + 1 < len(p) && p[i + 1] === '*') {
            pp.push(`*${p[i]}`)
            i ++
        }
        else pp.push(p[i]) 
    }
    const n = len(pp) - 1
    const dp: Array<any> = amr(n + 2, m + 2, 0) 
    dp[0][0] = 1

    for(let i = 1; i <= n; ++ i ) {
        for(let j = 0; j <= m; ++ j ) {
            if(pp[i][0] !== '*') {
                if(j < m && (s[j] === pp[i][0] || pp[i][0] === '.')) {
                    dp[i][j + 1] |= dp[i - 1][j]
                } 
            }
            else {
                if(pp[i][1] === '.') {
                    for(let k = j; k <= m; ++ k )
                        dp[i][k] |= dp[i - 1][j] 
                    continue 
                }
                let l = j + 1, fc = pp[i][1], cc = 0
                dp[i][j] |= dp[i - 1][j] 
                while(l <= m && s[l - 1] === fc) {
                    l ++, cc ++ 
                    dp[i][j + cc] |= dp[i - 1][j]
                }
            }
        }
    }


    return (dp[n][m] ? true : false) 
};