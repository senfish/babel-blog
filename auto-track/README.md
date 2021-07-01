## 利用babel-plugin实现特定函数自动埋点

  `cd auto-track && npm install`
  `npm run dev`
### 埋点规则

- 当函数名字含有track时，被认为是需要埋点的函数("君子协议")。
- 判断是否引入了track第三方包，如果没有则引入，反之，不引入。


### 实现思路
只考虑import 语法
1. 遍历ImportDeclaration节点，首先判断是否已经引入了对应的第三方包

2. 如果已经引用了，需要保存引入的名字，只考虑一下两种情况
    - `import xx from 'xxx'`
    - `import * as xx from 'xxx'`
3. 如果没有引入，需要引入第三方包，并且保证引入的名字不跟其他重复

4. 插入到对应的函数里面去