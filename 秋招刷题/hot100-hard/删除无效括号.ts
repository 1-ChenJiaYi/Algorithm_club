/**
  hot100 
  link: https://leetcode.cn/problems/remove-invalid-parentheses/?envType=problem-list-v2&envId=2cktkvj
  method: dfs + 剪枝
*/

var max = (...a) => Math.max(...a) 
var min = (...a) => Math.min(...a) 
var clg = (...a) => console.log(...a) 
var zs = (a) => Math.floor(a)
var db = (a) => a*1.00
var lowSort = (a) => a.sort( (x, y) => (x - y) )
var upSort = (a) => a.sort( (x, y) => (y - x) ) 
var sum = (a) => a.reduce((s, i) => (s + i), 0)
var len = (a) => a.length
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

function removeInvalidParentheses(S: string): string[] {
    const res: Array<string> = [], n = len(S) 
    const dfs = (i, s, cnt) => {
        if(cnt < 0) {
            return
        }
        if(i == n) {
            if(cnt === 0) {
                if(len(res) === 0 || len(res[0]) < len(s)) {
                    res.length = 0 
                    res.push(s) 
                } 
                else if(len(res) && len(res[0]) === len(s)) res.push(s)
            } 
            return 
        }

        if(S[i] >= 'a' && S[i] <= 'z') dfs(i + 1, s + S[i], cnt)
        else {
            dfs(i + 1, s, cnt) 
            dfs(i + 1, s + S[i], cnt + (S[i] === '(' ? 1 : -1))  
        }
    }
    dfs(0, '', 0)
    return qc(res)
};