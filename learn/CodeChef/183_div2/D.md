# 链接：[Practice Coding Problem](https://www.codechef.com/START183B/problems/MSTCOMP?tab=statement)





### 题意：

给定一个完全图，n, m分别表示，n个点，m条为1的边，剩下的边为0，问最小生成树的边权和的可能值的总和。





### 题解：

可以考虑怎么样最大限度的消除0，换取尽可能多的1，所以我们可以构造一种策略，每次新增的点都和原来的其它点有0的边，这样就会每次消除i 条边，i为原来的点数，这样我们得到了最少第x个点时可以恰好消除0，那么我们来证明如果x + 1, x + 2，一直到一个限度，如果0的边数足够一定可以构造出解，那么我们可以控制每次消除的0边数，保留到后面，这样一定可以得到。

