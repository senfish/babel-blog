// format = markdown | json | html ...
function generate(docs, format = 'markdown') {
  let str = '';
  docs.forEach(doc => {
    const {tags = []} = doc.doc || {};
    let paramsStr = '';
    tags.forEach(tag => {
      if(tag.title === 'param') {
        paramsStr += `| ${tag.name} | ${tag.type.name} | ${tag.description}   |\n`
      }
    });
    str += `
### ${doc.name} \n
#### ${doc.doc.description} \n| 参数    | 类型    | 描述   | \n| ---    | ---     | ---   | \n${paramsStr}\n`
  });
  return str;
}

module.exports = generate;
