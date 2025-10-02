/**
 hot100 
 link: https://leetcode.cn/problems/trapping-rain-water/?envType=problem-list-v2&envId=2cktkvj
 */

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
type Te = Array<number>
var cmp = (x: any, y: any) => {
    if(x[0] === y[0]) return (x[1] > y[1])  
    return x[0] > y[0] 
}
function useHeap<Te>(maxSize: number): Array<any> { 
  const infItem: Te = [zs(-1e10), zs(-1e10)] as Te
  const heap = new Array<Te>(maxSize + 2).fill(infItem)
  let sz = 0
  heap[1] = infItem
  let nx = 2
  const up: (number) => void
   = (i: number) => {
    while(i > 1 && cmp(heap[i], heap[zs(i/2)])) {
      [heap[i], heap[zs(i/2)]] = [heap[zs(i/2)], heap[i]]
      i = zs(i/2)
    }
  }
  const down: (number) => void 
  = (i: number) => {
    while(i * 2 < nx) {
      let j = i * 2
      // 选择较小的子节点
      if(j + 1 < nx && cmp(heap[j + 1], heap[j])) {
        j = j + 1
      }
      // 如果当前节点比子节点大，则交换
      if(cmp(heap[j], heap[i])) {
        [heap[i], heap[j]] = [heap[j], heap[i]]
        i = j
      } else {
        break
      }
    }
  }
  const push = (val: Te) => {
    heap[nx] = val
    up(nx)
    // clg("debug: ", val, heap)
    nx ++
    sz ++ 
  }
  const top: () => Te
   = () => heap[1]

  const pop = () => {
    heap[1] = heap[nx - 1] 
    down(1) 
    nx -- 
    sz -- 
  }

  const size: () => number 
  = () => sz 
  return [top, push, pop, size]
}
function trap(height: number[]): number {
    const n: number = len(height) 
    const h: Array<any> = [0, ...height]
    height = [0, ...height]
    let cur = [-1, n + 1] 
    for(let i = n; i >= 1; -- i ) {
        if(cur[0] < h[i]) cur = [h[i], i]
        else if(cur[0] === h[i]) cur[1] = i
        h[i] = [...cur] 
    }
    let res = 0 
    for(let i = 1; i < n; ++ i ) {
        let [mh, idx] = h[i + 1] 
        let nx = height[i] 
        clg(i, idx)
        for(let j = i + 1; j < idx; ++ j ) {
            if(height[j] < nx) {
                res += min(mh, nx) - height[j] 
                clg("debug: ", j, min(mh, nx) - height[j])
            }
            else nx = height[j] 
        }
        i = idx - 1
    }
    return res 
};