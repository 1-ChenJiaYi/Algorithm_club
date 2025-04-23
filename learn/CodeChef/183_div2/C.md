# 链接：[S to T Practice Coding Problem](https://www.codechef.com/problems/STOT)





### 题意：

给定一个长度一样的字符串s和t，对s操作：

选定i, s[i] == '1',且存在i + 1,让s[i + 1] 反转(1变0，0变1)，问最后操作成t且次数不超过3 * n的操作流程，无解输出-1。 



### 题解：

很典的构造，直接先把能变成1的全部变成1，然后从后往前考虑，每次改变需要改变的即可。