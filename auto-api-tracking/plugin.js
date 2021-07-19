const {declare} = require('@babel/helper-plugin-utils');
const {addDefault} = require('@babel/helper-module-imports');
const types = require('@babel/types');
// 先遍历一次import节点，判断是否引入了第三方包
// 如果引入了，就记住第三包的名字；如果没有引入，就引入一个第三包名字，并且生成唯一id

const autoApiTrackingPlugin = declare((api, options) => {
  api.assertVersion(7);
  return {
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse({
            ImportDeclaration(curPath) {
              // 如果引入了第三方包
              if(options.name === curPath.get('source').node.value) {
                state.trackName = curPath.node.specifiers[0].local.name
              }
            }
          })
          // 如果没有引入，需要引入错误中心，并且生成一个唯一id
          if (!state.trackName) {
            state.trackName = addDefault(path, options.name, {
              nameHint: path.scope.generateUid(options.name)
            }).name;
          }
        }
      },
      VariableDeclaration(path, state) {
        const requrestName = path.get('declarations.0.id').node.name
        
        if(!requrestName.includes(options.keyword)) return;
        path.traverse({
          TryStatement() {
            state.isTry = true;
          },
        });
        // 开始创建try catch 的ast
        path.traverse({
          ArrowFunctionExpression(curPath) {
            if(!state.isTry) {
              // 创建一个tryStatement
              const {body: originBody, generator, async, params} = curPath.node
              let template = api.template.statement(`${state.trackName}.add(err)`)();
              let catchClause = types.catchClause(types.identifier('err'), types.blockStatement([template]));
              let tryStatement = types.tryStatement(originBody, catchClause);
              let bodyStatement = types.blockStatement([tryStatement]);
              let arrowFunctionExpression = types.arrowFunctionExpression(
                params, bodyStatement, async
              )
              curPath.replaceWith(arrowFunctionExpression);
              curPath.skip();
            }
          }
        });
      },
    }
  }
});

module.exports = autoApiTrackingPlugin
