const doctrine = require('doctrine');

exports.resolveType = (tsType) => {
  const typeAnnotation = tsType.typeAnnotation;
  if (!typeAnnotation) return;
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
