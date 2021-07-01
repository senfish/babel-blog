首先，你需要安装help函数`npm install @babel/helper-module-imports --save`.

此函数主要有四个方法

- [addDefault](#addDefault)（`import _hintName from 'source'`）
- [addNamed](#addNamed)（`import { named as _hintedName } from "source";`）
- [addNamespace](#addNamespace)（`import * as _hintedName from "source";`）
- [addSideEffect](#addSideEffect)（`import "source";`）



### <a name='addDefault'></a>addDefault(path, importedSource, options)
  - `path`：当前ast的path路径参数
  - `importedSource`：引入的包名地址（ImportDeclaration节点的的source值）
  - `options`： 
      - `importedType`: `"es6" | "commonjs"` 要导入模块的类型，（default: `"commonjs"`）
      - `nameHint`：`string` 指定你引入包的名字为`_${nameHint}`
      - ......
```js
  // import _hintName from 'source'
  const {addDefault} = require('@babel/helper-module-imports');
  addDefault(path, 'source', {
    nameHint：'hintName'
  });
```
tips：如果需要生成当前模块唯一值，可使用`path.scope.generateUid('${name}')`。

### <a name='addNamed'></a>addNamed(path, name, importedSource, options)
  其他参数见[addDefault](#addDefault)方法
  - `name`： 模块重新命名的name
```js
  // import { named as _hintedName } from "source";
  const {addNamed} = require('@babel/helper-module-imports');
  addNamed(path, 'named', 'source', {
    nameHint: 'hintedName'
  });
```
### <a name='addNamespace'></a>addNamespace(path, importedSource, options)
  参数同[addDefault](#addDefault)方法
```js
  // import * as _hintedName from "source";
  const {addNamespace} = require('@babel/helper-module-imports');
  addNamespace(path, 'source', {
    nameHint: 'hintedName'
  });
```
### <a name='addSideEffect'></a>addSideEffect(path, importedSource, options)
  参数同[addDefault](#addDefault)方法
```js
  // import "source";
  const {addSideEffect} = require('@babel/helper-module-imports');
  addSideEffect(path, 'source');
```
