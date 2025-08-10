/**
 * https://codeforces.com/problemset/problem/2065/G
 */
const rl = require('readline').createInterface({ input: process.stdin });

const lines = []
const MAX_N = 200010

rl.on('line', line => {
    lines.push(line);
});

let _ = 0 

const iv = {
    st: new Array(MAX_N).fill(0), 
    q: new Array(MAX_N).fill(0),
    p: new Array(MAX_N).fill(0),
    cnt: 0 
}

// 线性筛
const init = () => {
    const n = 200000 
    iv.p[1] = 1 
    iv.st[1] = 1 
    for(let i = 2; i <= n; ++ i ) {
        if(!iv.st[i]) {
            iv.q[iv.cnt ++] = i 
            iv.p[i] = i    
        }
        for(let j = 0; iv.q[j] <= n / i; ++ j ) {
            iv.st[iv.q[j] * i] = 1 
            iv.p[iv.q[j] * i] = iv.q[j]  
            if(i % iv.q[j] == 0) break 
        }
    }
}

const solve = () => {
    const [n] = lines[_++].split(' ').filter(Number).map(Number);
    const a = lines[_++].split(' ').filter(Number).map(Number); 

    const ca = new Array(n + 2).fill(0)
    const cb = new Array(n + 2).fill(0)


    let ans = 0 
    let zsc = 0 

    let oc = 0 
    for(const v of a) if(v === 1) oc ++ 


    a.forEach(v => ca[v] ++ )
    a.forEach(v => {
        if(!iv.st[iv.p[v]] && !iv.st[Math.floor(v / iv.p[v])]) {
            cb[v] = 1 
        }
        else if(!iv.st[v]) zsc ++, cb[v] = 2  
    })

    cb.forEach((v, i) => {
        if(ca[i] === 0) return 
        if(v === 1) {
            ans += Math.floor(ca[i] * (ca[i] + 1) / 2) 
            ans += oc * ca[i] 
            ans += (ca[iv.p[i]] + (iv.p[i] !== Math.floor(i / iv.p[i]) ? 
            ca[Math.floor(i / iv.p[i])] : 0)) * ca[i] 
        }
        else if(v === 2){
            ans -= Math.floor(ca[i] * (ca[i] - 1) / 2) 
        }
    })  
    

    ans += Math.floor(zsc * (zsc - 1) / 2)  
    console.log(ans); 
}

rl.on('close', () => {   
    init() 
    const [tsCnt] = lines[_++].split(' ').map(Number) 
    for(let ts = 0; ts < tsCnt; ts++) 
        solve() 
}); 
