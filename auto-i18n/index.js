const path = require('path');
const fs = require('fs');
const parser = require('@babel/parser');
const {transformFromAstSync} = require('@babel/core');
const sourceCode = fs.readFileSync(path.join(__dirname, 'code.js'), 'utf8');
const autoTransformI18nPlugin = require('./plugins/index');


const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
  plugins:['jsx']
});

const {code} = transformFromAstSync(ast, sourceCode, {
  plugins: [
    [autoTransformI18nPlugin, {
      source: 'i18n',
      output: path.join(__dirname, 'doc')
    }]
  ]
});
fs.writeFileSync('./transformCode.js', code, 'utf8');
