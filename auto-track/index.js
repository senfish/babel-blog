const parser = require('@babel/parser');
const {transformFromAstSync} = require('@babel/core');
const path = require('path');
const fs = require('fs');
const autoParametersInsertPlugin = require('./plugins');
const sourceCode = fs.readFileSync(path.join(__dirname, './code.js'), 'utf8');
const astTree = parser.parse(sourceCode, {
  sourceType: 'unambiguous'
});

const {code} = transformFromAstSync(astTree, sourceCode, {
  plugins: [[
    autoParametersInsertPlugin, {
      source: 'tracker'
    }
  ]]
})
console.log(code);