const {declare} = require('@babel/helper-plugin-utils');
const fs = require('fs');
const path = require('path');

let intlIndex = 0;
// 获取i18n的参数key值
function nextIntlKey(value){
  ++intlIndex;
  return `intl_${intlIndex}_${value}`;
}

const autoTransformI18nPlugin = declare((api, options, dirname) => {
  api.assertVersion(7);
  if(!options.output) {
    throw new Error('options.output should not empty')
  }
  function save(file, key, value) {
    const i18nText = file.get('i18nText');
    i18nText.push({
      key,
      value
    });
    file.set('i18nText', i18nText);
  }
  function getExpression(path, key, state) {
    let replaceExpression = api.template.ast(`${state.i18nId}.t('${key}')`).expression;
    return replaceExpression;
  }
  return {
    pre(file) {
      file.set('i18nText', []);
    },
    visitor: {
      Program: {
        enter(path, state){
          let imported = false;
          path.traverse({
            ImportDeclaration(curPath) {
              const value = curPath.get('source').node.value;
              // 判断是否已经引入了i18n第三方包
              if(value === options.source) {
                imported = true;
                state.i18nId = curPath.get('specifiers.0.local').node.name;
                curPath.stop();
              }
            }
          });
          // 如果没有引入，就手动引入一遍
          if(!imported) {
            const i18nUid = path.scope.generateUid(`${options.source}`);
            const importAst = api.template.ast(`import ${i18nUid} from '${options.source}'`);
            path.node.body.unshift(importAst);
            state.i18nId = i18nUid;
          }
          // 支持注释不转换 const a = /*i18n-disable*/'tom'
          path.traverse({
            'StringLiteral|TemplateLiteral'(curPath) {
              if(Array.isArray(curPath.node.leadingComments)) {
                curPath.node.leadingComments = curPath.node.leadingComments.filter((comment, index) => {
                  if(comment.value === 'i18n-disable') {
                    curPath.node.skipTransform = true;
                    return false;
                  };
                  return true;
                })
              }
              // 不转换import语法里面的StringLiteral
              if(curPath.findParent(p => p.isImportDeclaration())) {
                curPath.node.skipTransform = true;
              }
            }
          })
        }
      },
      StringLiteral(path, state){
        if(path.node.skipTransform){
          return
        }
        const key = nextIntlKey(path.node.value);
        save(state.file, key, path.node.value);
        const replaceExpression = getExpression(path, key, state);
        path.replaceWith(replaceExpression);
        path.skip();
      },
      TemplateLiteral(path, state) {
        if(path.node.skipTransform){
          return
        }
        const quasis = path.get('quasis');
        quasis.forEach(TemplateElement => {
          const value = TemplateElement.node.value.raw;
          const key = nextIntlKey(value);
          save(state.file, key, value);
          const replaceExpression = getExpression(path, key, state);
          path.replaceWith(replaceExpression);
          path.skip();
        })
    }
    },
    post(file) {
      const i18nText = file.get('i18nText');
      let content = i18nText.reduce((pre, cur) => {
        pre[cur.key] = cur.value;
        return pre;
      }, {});
      content = `const resource = ${JSON.stringify(content, null, 4)};\nexport default resource;`;
      const outputPath = path.join(options.output, 'zh_CN.js');
      console.log(`文件生成成功...  ${outputPath}`);
      fs.writeFileSync(outputPath, content, 'utf8');
    }
  }
});

module.exports = autoTransformI18nPlugin;