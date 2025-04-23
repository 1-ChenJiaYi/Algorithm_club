# 链接： [Practice Coding Problem](https://www.codechef.com/START183B/problems/MAXTRI)





### 题意：

给定一个整数n，问1到n中选出三个不同的边，组成一个三角形的最大周长是多少，无解输出-1.





### 题解：

有解最多枚举n到n-10为最大边j，且其它两个边一定是尽可能大，所以是j - 1和j - 2，最多到j-10，所以按照这种直接暴力的思想做就可以了。

