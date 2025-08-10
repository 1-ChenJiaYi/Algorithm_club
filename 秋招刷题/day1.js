/**
  题目链接：https://codeforces.com/contest/2094/problem/G
  题目大意：
    首先是刚开始给定一个空的序列，每次会进行三种操作：
    （1）往序列的末尾push一个数字。
    （2）将整个序列循环右移，[a, b, c] => [c, a, b]
    （3）翻转整个序列，[a, b, c] => [c, b, a]
    2s内，操作次数和总数是2e5 级别的。
 */


const { type } = require('os');

const rl = require('readline').createInterface({ input: process.stdin });

const lines = [];
rl.on('line', line => {
    lines.push(line);
});

console.log(object);
const N = 200010

let nowQ = 0 
rl.on('close', () => {
    let tsCnt = lines[nowQ++]  

    while(tsCnt --) {
        const solve = () => {
            let ans = 0n, su = 0n 
            let n = Number(lines[nowQ++])
            let le = new Array(n + 2).fill(-1)   
            let ri = new Array(n + 2).fill(-1) 
            let va = new Array(n + 2).fill(0n)   
            let id = 0n  
            let head = -1, end = -1;
            let res = 0 
            for(let qu = 0; qu < n; ++ qu) {
                let [opStr, xStr] = lines[nowQ++].split(' ')
                let op = Number(opStr)
                let x = xStr !== undefined ? Number(xStr) : 0
                
                // console.log(`level${qu}`, head, end, va[head], va[end]); 
                switch(op) {
                    
                    case 1: 
                        // 把最后面的数放在第一个 
                        if(le[end] !== -1 && head !== end) {
                            // console.log(su, res, va[end]);  
                            ans = ans - va[end] * id + su 
                            ri[end] = head 
                            ri[le[end]] = -1 
                            le[head] = end 
                            let tmp = le[end] 
                            le[end] = -1 
                            head = end 
                            end = tmp 
                        }
                        else {
                            
                        }
                        break 
                    case 2:
                        // 前后互换
                        ans = (id + 1n) * su - ans;
                        // console.log(id, su, ans); 
                        [le, ri] = [ri, le] 

                        let tmp = head 
                        head = end 
                        end = tmp 
                        break 
                    case 3: 
                        res += Number(x) 
                        id += 1n 
                        let nid = Number(id)  
                        // 插入最后一个数 
                        if(nid === 1) {
                            le[nid] = -1
                            ri[nid] = -1
                            head = nid
                        }           
                        else {
                        ri[end] = nid 
                        le[nid] = end 
                        ri[nid] = -1            
                        }  

                        end = nid 
                        va[nid] = BigInt(x) 
                        ans += va[end] * id     
                        su += va[end] 
                        break 
                    default:
                        break 
                }
                console.log(ans.toString()); 
            }
        }
        solve() 
    }
    
});
