const doctrine = require('doctrine');

exports.resolveType = (typeAnnotation) => {
  let type;
  switch (typeAnnotation.type) {
    case 'TSStringKeyword' :
      type = 'string';
      break;
    case 'TSNumberKeyword' :
      type = 'number';
      break;
    case 'TSBooleanKeyword' :
      type = 'boolean';
      break;
    case 'TSObjectKeyword' :
      type = 'object';
      break
    default:
      type = 'string';
  }
  return type;
}

exports.parseComments = (comments) => {
  if(!comments) return;
  return doctrine.parse(comments, {
    unwrap: true
  });
}
