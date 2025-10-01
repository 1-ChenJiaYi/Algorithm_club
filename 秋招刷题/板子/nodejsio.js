const rl = require('readline').createInterface({ input: process.stdin })

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

// input: 
const lines = [] 
let _c = 0 
var _list_ = () => {
  return gl(lines[_c ++ ]) 
}
var _tlist_ = (n) => {
  let res = lines.slice(_c, _c + n).map(i => gl(i)) 
  _c = _c + n
  return res  
}


rl.on('line', line => lines.push(line.trim()) )  

const main = () => {

}

// 处理完输入传给main
rl.on('close', () => { 
  
}) 


