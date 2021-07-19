const path = require('path');
const fs = require('fs');
const parser = require('@babel/parser');
const {transformFromAstSync} = require('@babel/core');
const sourceCode = fs.readFileSync(path.join(__dirname, 'source.jsx'), 'utf8');
const autoApiTrackingPlugin = require('./plugin.js');
console.log('autoApiTrackingPlugin', autoApiTrackingPlugin);
const ast = parser.parse(sourceCode, {
  sourceType: 'module',
  plugins: ['jsx']
});

const {code} = transformFromAstSync(ast, sourceCode, {
  plugins: [[
    autoApiTrackingPlugin, {
      keyword: 'Dispatch',
      name: 'error-center'
    }
  ]]
});

fs.writeFile('./target.jsx', code, function (err) {
  if(err) {
    return console.log('生成文件失败')
  } else {
    console.log('生成文件成功')
  }
});