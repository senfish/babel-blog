const fs = require('fs-extra');
const { transformFromAstSync } = require('@babel/core');
const parser = require('@babel/parser');
const path = require('path');
const traverse = require('@babel/traverse').default;
const autoDocumentPlugin = require('./plugins'); // 自定义babel插件

const sourceCode = fs.readFileSync(path.join(__dirname, 'code.ts'), 'utf8');

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
  plugins: ['typescript']
});
// traverse(ast, {
//   FunctionDeclaration(path, state){
//     console.log(path);
//   }
// })
transformFromAstSync(ast, sourceCode, {
  plugins: [[autoDocumentPlugin, {
    outputDir: path.resolve(__dirname, './docs'),
    format: 'markdown'
  }]]
})


