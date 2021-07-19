# babel-blog

babel 学习笔记

- [api 自动生成文档](https://github.com/senfish/babel-blog/blob/master/api-auto-to-docs/README.md)
- [自动埋点](https://github.com/senfish/babel-blog/blob/master/auto-track/README.md)
- [函数自动收集错误](https://github.com/senfish/babel-blog/blob/master/auto-api-tracking/README.md)
- [自动国际化](https://github.com/senfish/babel-blog/blob/master/auto-i18n/README.md)
- 压缩混淆
- type checker
- linter
## babel-help 函数

- [@babel/helper-module-imports](https://github.com/senfish/babel-blog/blob/master/babel-api-documents/helper/helper-module-imports.md)
  `import`语法 help 方法，更方便快捷的生成一个 import 语法的 ast;
- [@babel/helper-plugin-utils](https://github.com/senfish/babel-blog/blob/master/babel-api-documents/helper/helper-plugin-utils.md)
  babel-plugin 帮助函数

## 常见 path 的方法

- `inList()`： 判断节点是否在数组中
- `get(key)`： 获取某个属性的 path
- `set(key, node)`：设置某个属性的值
- `getSibling(key)`：获取某个下标的兄弟节点
- `getNextSibling()`：获取下一个兄弟节点
- `getPrevSibling()`：获取上一个兄弟节点
- `getAllPrevSiblings()`： 获取之前的所有兄弟节点
- `getAllNextSiblings()`： 获取之后的所有兄弟节点
- `find(callback)`： 从当前节点到根节点来查找节点（包括当前节点），调用 callback（传入 path）来决定是否终止查找
- `findParent(callback)`： 从当前节点到根节点来查找节点（不包括当前节点），调用 callback（传入 path）来决定是否终止查找
- `isXxx(opts)`： 判断当前节点是否是某个类型，可以传入属性和属性值进一步判断，比如path.isIdentifier({name: 'a'})
- `assertXxx(opts)`： 同 isXxx，但是不返回布尔值，而是抛出异常
- `insertBefore(nodes)`： 在之前插入节点，可以是单个节点或者节点数组
- `insertAfter(nodes)`： 在之后插入节点，可以是单个节点或者节点数组
- `replaceWith(replacement)`： 用某个节点替换当前节点
- `replaceWithMultiple(nodes)`： 用多个节点替换当前节点
- `replaceWithSourceString(replacement)`： 解析源码成 AST，然后替换当前节点
- `remove()`： 删除当前节点
- `traverse(visitor, state)`： 遍历当前节点的子节点，传入 visitor 和 state（state 是不同节点间传递数据的方式）
- `skip()`： 跳过当前节点的子节点的遍历
- `stop()`： 结束所有遍历

部分用法可查看[babel-handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

未完，待续 ing...
