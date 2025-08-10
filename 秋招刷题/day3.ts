/**
 题目链接：https://leetcode.cn/problems/the-earliest-and-latest-rounds-where-players-compete/?envType=daily-question&envId=2025-07-14

 */

 function earliestAndLatest(n: number, firstPlayer: number, secondPlayer: number): number[] {
  let c1 = firstPlayer - 1, c2 = n - secondPlayer;
  const dp = new Map<number, [number, number]>();
  
  const min = (x1: number, x2: number) => Math.min(x1, x2);
  const max = (x1: number, x2: number) => Math.max(x1, x2);

  /** debug */
  const fk = (x) => {
      console.log("------------------")
      console.log(x)  
      for(let i = 0; i < n; ++ i ) {
          if(x >> i & 1) {
              console.log(i + 1)  
          }
      } 
      // console.log([v1,v 2])
      console.log("-------------------")
  
  }
  const f = (x: number): [number, number] => {
      if(dp.has(x)) return dp.get(x) 
      const tmp = [] 
      let c1 = -1, c2 = -1, curIdx = 0 
      for(let i = 0; i < n; ++ i ) 
          if(x >> i & 1) {
              if(i + 1 === firstPlayer) c1 = curIdx
              else if(i + 1 === secondPlayer) c2 = curIdx  
              tmp.push(i + 1)
              curIdx ++ 
          }

      // if(tmp[0] === 2 && tmp[1] === 4 && tmp.length === 2) {
      //     console.log(c1, c2)
      // }
      if(c1 === tmp.length - 1- c2) {
          dp.set(x, [1, 1])
          return [1, 1] 
      }

      const m = tmp.length 
      const md2 = Math.floor(m / 2) 
      // console.log(tmp.length)
      const nk = 1 << md2  
      let rs1 = n + 1, rs2 = 0 
      // console.log(nk, c1, c2) 
      for(let i = 0; i < nk; ++ i ) {
          let flag = 1 
          // console.log("debug")
          let sta = x 
          // console.log((sta >> 5 & 1)) 
          for(let j = 0; j < md2; ++ j ) {
              let l = tmp[j], r = tmp[tmp.length - 1 - j]
              if(i >> j & 1) {
                  if(r === firstPlayer || r === secondPlayer) {
                      flag = 0 
                      break 
                  }
                  sta -= (1 << r - 1) 
              }
              else {
                  if(l === firstPlayer || l === secondPlayer) {
                      flag = 0 
                      break 
                  }
                  // console.log("debug: ", l-1) 
                  sta -= (1 << l - 1)  
              }
          }

          if(tmp[0] === 2 && tmp[1] === 4 && tmp.length === 2) {
              console.log(1111111, flag)
          }
          if(!flag) continue 
          const [v1, v2] = f(sta)
          // fk(sta, v1, v2)

          // console.log(
          //     fk(sta) 
          //     ,
          //     tmp,
          //     v1,v2
          // )
          rs1 = min(rs1, v1 + 1) 
          rs2 = max(rs2, v2 + 1) 
      }

      dp.set(x, [rs1, rs2]) 
      return [rs1, rs2] 
  };

  return f((1 << n) - 1);
}