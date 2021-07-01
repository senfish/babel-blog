const {declare} = require('@babel/helper-plugin-utils');
const imports = require('@babel/helper-module-imports');
const {addDefault, addNamed, addNamespace, addSideEffect} = imports;
const autoParametersInsertPlugin = declare((api, options, dirname) => {
  api.assertVersion(7);
  return {
    visitor: {
      // 遍历import是否有第三方包，并记录第三方的引入名字；
      // 如果没有找到，就引入一个第三方包，并记录第三方包的名字。
      Program: {
        enter(path, state) {
          path.traverse({
            ImportDeclaration(curPath) {
              // 判断是否已经引入了第三方包
              if(curPath.get('source').node.value === options.source) {
                // 考虑的类型 
                // import * as EC from 'error-center'
                // import EC from 'error-center'
                const specifiers = curPath.get('specifiers.0');
                console.log(specifiers.get('local').toString());
                state.trackerId = specifiers.get('local').toString();
                curPath.stop();// 跳出遍历
              }
            }
          });
          // 未找到就引入第三方包，并且创建一个唯一的名字
          if(!state.trackerId) {
            state.trackerId = addDefault(path, options.source, {
              nameHint: path.scope.generateUid(options.source)
            }).name;
          }
          // 创建一个ast的template模板 ${state.trackerId}()
          state.trackerAST = api.template.statement(`${state.trackerId}()`)();
        }
      },
      'FunctionExpression|ArrowFunctionExpression|ClassMethod|FunctionDeclaration'(path, state) {
        const bodyPath = path.get('body');
        if(bodyPath.isBlockStatement()){
          bodyPath.node.body.unshift(state.trackerAST);
        } else {
          // 创建一个blockStatement
          const ast = api.template.statement(`{${state.trackerId}();return PREV_BODY;}`)({PREV_BODY: bodyPath.node});
          bodyPath.replaceWith(ast);
        }
      }
    },
  }
})

module.exports = autoParametersInsertPlugin;