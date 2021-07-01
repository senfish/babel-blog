首先，你需要安装help函数`npm install @babel/helper-plugin-utils --save`.

辅助plugin工具函数


use：

```js
  const {declare} = require('@babel/helper-plugin-utils');
  const {transformFromAstSync} = require('@babel/core');
  const autoParametersInsertPlugin = declare((api, options, dirname) => {
    // api 
    // options 插件参数
    // dirname 当前根目录路径
    return {
      visitor: {
        Program: {
          enter(path, state) {

          }
        }
      }
    }
  });
  const {code} = transformFromAstSync(ast, sourceCode, {
    plugins: [
      [autoParametersInsertPlugin, {
        name:'test'
      }]
    ]
  })
```