var max = (...a) => Math.max(...a)
var clg = (...a) => console.log(...a)
function largestRectangleArea(heights: number[]): number {
    const n: number = heights.length 
    heights = [0, ...heights] 
    const left: Array<number> = new Array(n + 2).fill(1) 
    const right: Array<number> = new Array(n + 2).fill(n)
    const stk: Array<number> = new Array(n + 2).fill(-1) 
    let top = -1 
    for(let i = 1; i <= n; ++ i ) {
        while(top > -1 && heights[stk[top]] > heights[i]) {
            right[stk[top--]] = i - 1 
        }
        stk[++ top] = i 
    }
    top = -1 
    for(let i = n; i >= 1; -- i ) {
        while(top > -1 && heights[stk[top]] > heights[i]) {
            left[stk[top--]] = i + 1; 
        }
        stk[++top] = i
    }
    let res: number = 0 
    for(let i = 1; i <= n; ++ i ) {
        clg(i, left[i], right[i])
        res = max(res, heights[i] * (right[i] - left[i] + 1)); 
    }
    return res 
};