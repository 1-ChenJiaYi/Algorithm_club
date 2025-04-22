## C++堆的自定义排序:

```cpp
头文件：#include <queue> 
堆： priority_queue<Type, Container, Functional>
大根堆：priority_queue<int> q;
小根堆：priority_queue<int, vector<int>, greater<int>> pq; 
```

----

##### 2.3 对于自定义类型，则必须重载operator<或者重写仿函数。

##### 2.3.1 重载operator<的例子：返回true时，说明左边形参的优先级低于右边形参

```cpp
#include <bits/stdc++.h> 
using namespace std;
struct Node{
    int x, y;
};
bool operator<(Node a, Node b){//返回true时，说明a的优先级低于b
    if( a.x== b.x ) return a.y> b.y;
    return a.x > b.x;
}
int main(){
    priority_queue<Node> q;
    for(int i= 0; i< 10; ++i )
    q.push(Node(rand(), rand()));
    while(!q.empty()){
        cout << q.top().x << ' ' << q.top().y << endl;
        q.pop();
    }
    return 0;
}
```

但此时不能像基本类型这样声明priority_queue<Node,vector<Node>,greater<Node> >，原因是greater<Node>没有定义，如果想用这种方法定义则可以重载operator >。

例子：返回的是小顶堆。但不怎么用，习惯是重载operator<。

```cpp
#include <iostream>
#include <queue>
using namespace std;
struct Node{
    int x, y;
};
bool operator>( Node a, Node b ){//返回true，a的优先级大于b
    //x大的排在队前部；x相同时，y大的排在队前部
    if( a.x== b.x ) return a.y> b.y;
    return a.x> b.x;
}
int main(){
    priority_queue<Node,vector<Node>,greater<Node> > q;
    for( int i= 0; i< 10; ++i )
    q.push( Node( rand(), rand() ) );
    while( !q.empty() ){
        cout << q.top().x << ' ' << q.top().y << endl;
        q.pop();
    }
    return 0;
}
```

---

##### 2.3.2 重写仿函数的例子（返回值排序与2.3.1相同，都是小顶堆。先按x升序，x相等时，再按y升序）：

```cpp
#include <iostream>
#include <queue>
using namespace std;
struct Node{
    int x, y;
    Node( int a= 0, int b= 0 ):
        x(a), y(b) {}
};
struct cmp{
    bool operator() ( Node a, Node b ){//默认是less函数
        //返回true时，a的优先级低于b的优先级（a排在b的后面）
        if( a.x== b.x ) return a.y> b.y;
        return a.x> b.x; }
};
int main(){
    priority_queue<Node, vector<Node>, cmp> q;
    for( int i= 0; i< 10; ++i )
    q.push( Node( rand(), rand() ) );
    while( !q.empty() ){
        cout << q.top().x << ' ' << q.top().y << endl;
        q.pop();
    }
    return 0;
}
```

