/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
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


function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    
    let res: Array<[number, ListNode | null]> = []

    const dfs = (i: ListNode | null) => {
        res.push([i.val, i]) 
        if(i.next !== null) dfs(i.next) 
    }
    
    for(const i of lists) {
        if(i === null) continue
        dfs(i)     
    }

    if(len(res) === 0) return null     
    res = qc(res)
    res.sort((a: [number, ListNode | null], b: [number, ListNode | null]) => {
        return a[0] - b[0]
    })


    for(let i = 0; i < len(res) - 1; ++ i ) {
        res[i][1].next = res[i + 1][1]
    } 

    // const ans: ListNode | null = res[0][1]
    return res[0][1] 
};