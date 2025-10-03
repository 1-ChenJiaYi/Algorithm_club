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
var len = (a) => a.length 
var qc = (a: Array<any>) => Array.from(new Set(a))
var _dx = [1, -1, 0, 0]
var _dy = [0, 0, 1, -1] 
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
function maximalRectangle(matrix: string[][]): number {
    const n: number = len(matrix), m: number = len(matrix[0]) 
    const s: Array<Array<number>> = amr(n + 2, m + 2, 0) 
    const calc = (i1: number, j1: number, i2: number, j2: number) => {
        return s[i2][j2] - s[i1 - 1][j2] - s[i2][j1 - 1] + s[i1 - 1][j1 - 1]
    }
    for(let i = 1; i <= n; ++ i ) 
        for(let j = 1; j <= m; ++ j ) {
            s[i][j] = Number(matrix[i - 1][j - 1])
            s[i][j] += s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1] 
        }

    let res: number = 0
    for(let i = 1; i <= n; ++ i ) {
        for(let j1 = 1; j1 <= m; ++ j1 ) 
            for(let j2 = j1; j2 <= m; ++ j2 ) {
                if(calc(i, j1, i, j2) === j2 - j1 + 1) {
                    let l = 0, r = n - i
                    while(l < r) {
                        let mid = zs((l + r + 1) / 2) 
                        if(calc(i,j1, i+mid,j2) === (j2 - j1 + 1) * (mid + 1)) {
                            l = mid 
                        }
                        else r = mid - 1 
                    }
                    res = max(res, (j2 - j1 + 1) * (l + 1)) 
                }
            }
    }

    return res
};