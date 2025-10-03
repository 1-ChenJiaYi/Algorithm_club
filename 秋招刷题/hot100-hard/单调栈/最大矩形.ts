var max = (...a) => Math.max(...a) 
var min = (...a) => Math.min(...a) 
var clg = (...a) => console.log(...a) 
var zs = (a: number) => Math.floor(a)
var int = (a: any) => Math.floor(Number(a)) 
var double = (a) => Number(a)*1.00
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
    const n: number = len(matrix)
    const m: number = len(matrix[0])
    let res: number = 0
    const pre: Array<Array<number>> = amr(n + 2, m + 2, 0) 
    for(let i = 1; i <= n; ++ i ) {
        for(let j = 1; j <= m; ++ j ) {
            if(int(matrix[i - 1][j - 1]) === 0) continue;
            let k = j
            pre[i][k] = 1 
            while(k + 1 <= m && int(matrix[i - 1][k]) === 1) {
                ++ k
                pre[i][k] = pre[i][k - 1] + 1 
            }
            j = k 
        }
    }
    const left: Array<number> = new Array(n + 2).fill(1) 
    const right: Array<number> = new Array(n + 2).fill(n) 
    const stk: Array<number> = new Array(n + 2).fill(-1) 
    for(let i = 1; i <= m; ++ i ) {
        let top = -1   
        for(let j = 1; j <= n; ++ j ) {
            left[j] = 1, right[j] = n  
            while(top > -1 && pre[j][i] < pre[stk[top]][i]) {
                right[stk[top --]] = j - 1 
            }
            stk[++ top] = j
        }
        top = -1 
        for(let j = n; j >= 1; -- j ) {
            while(top > -1 && pre[j][i] < pre[stk[top]][i]) {
                left[stk[top --]] = j + 1
            }
            stk[++ top] = j 
        }
        for(let j = 1; j <= n; ++ j ) {
            const x: number = pre[j][i] * (right[j] - left[j] + 1)
            // clg("debug: ", 
            //     j, i, pre[j][i], left[j], right[j], x
            // )
            res = max(res, x) 
        }
    }
    return res
};