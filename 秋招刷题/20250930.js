`
  link: https://codeforces.com/contest/2137/problem/E
  code: https://codeforces.com/contest/2137/submission/341199118
  主要是分类讨论模拟
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
const lines = [] 
let _c = 0 
rl.on('line', line => lines.push(line) )  

const main = (n, m, a) => {
    const nxm = (a) => {
        lowSort(a) 
        let mex = 0 
        a.forEach(i => { 
            if(mex === i) mex ++ 
        })
        for(let i = 0; i < n; ++ i ) {
            let j = i 
            while(j + 1 < n && a[j + 1] === a[j]) ++ j 
            if(j - i + 1 === 1 && a[i] < mex) continue 
            else {
                for(let k = i; k <= j; ++ k ) a[k] = mex
            }
            i = j 
        }
        return sum( a ) 
    }
    let _c = 0 

    a.forEach(i => {
        _c += (i === 0)
    })

    if(_c === 0) {
        clg( m % 2 ? 0 : n )
        return
    }
    else if(_c >= 2) {
        let su = nxm( a ) 
        m -- 
        if(!m) {
            clg(su)
        }
        else {
            clg( m % 2 ? 0: n )
        }
        return 
    } 
    
    let su = nxm( a ) 
    m -= 1 
    if(!m) {
        clg(su) 
        return 
    }
    su = nxm( a ) 
    m -= 1
    if(!m) {
        clg(su) 
        return 
    }
    
    lowSort(a) 
    
    let mex = -1, c = -1
    for(let i = 0; i < n; ++ i ) {
        let j = i 
        while(j + 1 < n && a[j + 1] === a[j]) ++ j 
        if(j - i + 1 > 1 && j === n - 1) {
            mex = a[i], c = j - i + 1
        }
        i = j 
    }
    let me = 0
    a.forEach(i => me += (me === i))
    if(mex === -1) clg( sum(a) ) 
    else clg(m % 2 === 0 ? sum( a ) : (sum( a ) - c * mex + c * me))
}

rl.on('close', () => { 
   let ts = lines[_c ++].split(' ').map(i => zs(i))[0] 
   while(ts -- ) {
     main(...gl(lines[_c ++]),gl(lines[_c ++]))
   }
}) 