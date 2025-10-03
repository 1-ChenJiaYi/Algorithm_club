const max = (a, b) => { return Math.max(a, b) }
const log = (...x) => { console.log(...x) }
function maxPathSum(root: TreeNode | null): number {
    if (root === null) return 0;
    let w: number[] = [0];
    let n = 0 
    const cal = (x) => {
        if(x === null) return 
        n ++ 
        cal(x.left) 
        cal(x.right)
    }
    cal(root) 
    ++ n 
    
    const h: number[] = new Array(n + 1).fill(-1);
    const e: number[] = new Array(n + 1).fill(0);
    const ne: number[] = new Array(n + 1).fill(0);
    const f: number[] = new Array(n + 1).fill(Math.floor(-1e9));
    let idx = 0;
    let cnt = 1; 
    const add = (a: number, b: number) => {
        e[idx] = b;
        ne[idx] = h[a];
        h[a] = idx++;
    };    

    const build = (node: TreeNode | null, index: number) => {
        if (node === null) return;
        w[index] = node.val;
        if(node.left) {
            ++ cnt 
            add(index, cnt) 
            build(node.left, cnt) 
        }
        if(node.right) {
            ++ cnt 
            add(index, cnt)
            build(node.right, cnt)
        }
    };
    build(root, 1);

    let ans = Math.floor(-1e9);
    const dfs = (po: number) => {
        if (w[po] === undefined) return; // 防止访问未初始化的节点
        let mx = w[po];
        for (let i = h[po]; i !== -1; i = ne[i]) {
            const j = e[i];
            dfs(j);
            mx = Math.max(mx, w[po] + f[j]);
        }
        f[po] = mx;
        ans = Math.max(ans, f[po]);
    };
    dfs(1);

    for(let p = 1; p <= cnt; ++ p ) {
        let arr = []
        for(let i = h[p]; ~i; i = ne[i] ) {
            let j = e[i];
            arr.push(f[j]) 
        }
        if(arr.length >= 2) {
            let m = arr.length 
            arr.sort() 
            // log(p, arr)
            ans = max(ans, arr[m - 1] + arr[m - 2] + w[p])  
        }
    }

    return ans;
}