var len = (a: Array<any> | string) => a.length
var clg = (...a) => console.log(...a)
var zs = (a: number) => Math.floor(a)
function minWindow(s: string, t: string): string {
    const mp: Map<string, number>  = new Map() 
    const ned: Map<string, number> = new Map() 
    const n: number = len(s) 
    const res: Array<[number, number]> = [] 
    for(const i of t) {
        mp.set(i, 0)
        ned.set(i, (ned.get(i) || 0) + 1)
    }  
    const aim: number = ned.size
    let l = -1, r = -1, sz = 0 
    while(l < n - 1) {
        if(l !== -1) {
            mp.set(s[l], (mp.get(s[l]) || 0) - 1) 
            if(mp.get(s[l]) === ned.get(s[l]) as number - 1) sz -- 
            if(sz === aim && l <= r) res.push([l, r])
        }
        l ++ 
        while((r < l || sz < aim) && r + 1 < n) {
            r ++ 
            mp.set(s[r], (mp.get(s[r]) || 0) + 1)
            if(mp.get(s[r]) === ned.get(s[r])) sz ++  
            if(sz === aim && l <= r) res.push([l, r]) 
        }

        if(sz === aim && l <= r) res.push([l, r])
    }

    if(!len(res)) {
        return ""
    }
    const [ul, ur] = res.reduce((pre, cur) => {
        if(pre[1] - pre[0] > cur[1] - cur[0]) {
            pre[1] = cur[1] 
            pre[0] = cur[0]
        }
        return pre
    }, [0, zs(1e9)])

    return s.slice(ul, ur + 1)
};