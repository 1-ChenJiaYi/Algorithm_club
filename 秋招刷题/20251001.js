`
  link: https://codeforces.com/contest/2075/problem/B
  code: https://codeforces.com/contest/2075/submission/341244936
`

const rl = require('readline').createInterface({ input: process.stdin })
var max = (...a) => Math.max(...a) 
var min = (...a) => Math.min(...a) 
var clg = (...a) => console.log(...a) 
var zs = (a) => Math.floor(a)
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
const lines = [] 
let _c = 0 

rl.on('line', line => lines.push(line) )  


const main = (n, k, a) => {
    if(k === 1) {
        let s1 = zs(-1), s2 = zs(-1) 
        for(let i = 0; i < n; ++ i ) {
            if(i !== 0) s1 = max(s1, a[i])
            if(i !== n - 1) s2 = max(s2, a[i]) 
        }
        clg( max(s1 + a[0], s2 + a[n - 1]) )
    }
    else {
        upSort(a)
        let su = 0 
        for(let i = 0; i < min(n, k + 1); ++ i ) {
            su += a[i] 
        }
        clg( su )
    }
}

rl.on('close', () => { 
   let ts = lines[_c ++].split(' ').map(i => zs(i))[0] 
   while(ts -- ) {
     main(...gl(lines[_c ++]),gl(lines[_c ++]))
   }
}) 