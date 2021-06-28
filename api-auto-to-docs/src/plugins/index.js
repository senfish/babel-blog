
const {declare} = require('@babel/helper-plugin-utils');
const {resolveType, parseComments} = require('./utils');
const generate = require('./generate');
const fs = require('fs-extra');
const path = require('path');

const autoDocumentPlugin = declare((api, options, dirname) => {
  api.assertVersion(7);
  return {
    pre(file) {
      file.set('docs', []);
    },
    visitor: {
      FunctionDeclaration(path, state) {
        const docs = state.file.get('docs');
        docs.push({
          type: 'function',
          name: path.get('id').toString(), // 函数名字
          params: path.get('params').map(paramPath => {
            return {
              name: paramPath.toString(), // 参数名字
              type: resolveType(paramPath.getTypeAnnotation())
            }
          }),
          return: resolveType(path.get('returnType').getTypeAnnotation()),
          doc: path.node.leadingComments && parseComments(path.node.leadingComments[0].value)
        });
        state.file.set('docs', docs);
      }
    },
    post(file) {
      const docs = file.get('docs');
      const res = generate(docs, options.format);
      const output = path.join(options.outputDir, 'docs.md');
      fs.writeFileSync(output, res, 'utf8');
      console.info(`api文档生成成功${output}`)
    }
  }
});


module.exports = autoDocumentPlugin;
