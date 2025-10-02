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
var len = (a) => a.length 
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


/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */


function serialize(root: TreeNode | null): string {
    if(root === null) return '$'
    const res: Array<any> = []
    let idx = 0;
    const dfs = (node: TreeNode | null) => {
        let id = ++ idx
        res[id] = [node.val, -1, -1]        
        if(node.left) {
            let lid = dfs(node.left)
            res[id][1] = lid  
        }
        if(node.right) {
            let rid = dfs(node.right)
            res[id][2] = rid 
        }
        return id 
    }
    dfs(root)  
    return JSON.stringify(res) 
};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
    if(data === '$') {
        return null
    }
    const res: Array<any> = JSON.parse(data) 
    // clg(res) 
    const tt: TreeNode = {
        'left': null, 
        'right': null,
        'val': 10 
    }
    const dfs = (id: number) => {
        if(id === -1) return null
        const x: TreeNode | null = {
            'left': null, 
            'right': null,
            'val': res[id][0] 
        }
        for(let i = 1; i < res[id].length; ++ i ) {
            let ed = res[id][i] 
            if(i === 1) x.left = dfs(ed)
            else x.right = dfs(ed) 
        }

        return x 
    }

    // clg(dfs(1)) 
    const ans: TreeNode | null = dfs(1) 
    // clg(ans)
    return ans
};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */