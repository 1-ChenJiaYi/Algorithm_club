var len = (a: Array<any>) => a.length
var zs = (a: number) => Math.floor(a)
var clg = (...a) => console.log(...a)  
var min = (...a) => Math.min(...a)  
function findMedianSortedArrays(a: number[], b: number[]): number {
    const n = len(a), m = len(b) 
    const find = (k: number) => {
        if(!n && !m) {
            return 0
        }
        
        if(!n) {
            return b[k - 1]  
        }
        if(!m) {
            return a[k - 1]
        }
        clg(k)
        let l1 = 0, r1 = n - 1, l2 = 0, r2 = m - 1 
        while(k > 1) {
            let c = zs(k / 2) - 1 
            let c1 = min(l1 + c, n - 1) 
            let c2 = min(l2 + c, m - 1)
            
            if(l1 < n && l2 < m) {
                if(a[c1] <= b[c2]) {
                    // clg("a")
                    k -= (c1 - l1 + 1) 
                    l1 = c1 + 1 
                }
                else  {
                    // clg("b")
                    k -= (c2 - l2 + 1) 
                    l2 = c2 + 1 
                }
            }
            else {
                if(l1 < n) {
                    l1 = l1 + (k - 1)
                }
                else if(l2 < m) {
                    l2 = l2 + (k - 1)
                }
                break
            }

        }
        
        let res = min(l1 < n ? a[l1] : zs(1e9), l2 < m ? b[l2] : zs(1e9)) 
        
        clg("debug: ", k, l1, l2, res)
        return res 
    }
    

    if((n + m) % 2) return find(zs((n + m) / 2) + 1) 
    else {
        return (find(zs((n + m) / 2)) + find(zs((n + m) / 2) + 1)) / 2
    }

    return -1 
};