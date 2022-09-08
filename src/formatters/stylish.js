import _ from 'lodash';

const signed = (obj) => {
  switch (obj.status) {
    case 'added':
      return '+ ';
    case 'deleted':
      return '- ';
    default:
      return '  ';
  }
};

const stringify = (data, depthTree) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const replacer = ' '.repeat(2);
  const currentIndent = replacer.repeat(depthTree + 3);
  const bracketIndent = replacer.repeat(depthTree + 1);
  const keys = _.keys(data);
  const result = keys.map((key) => `${currentIndent}${key}: ${stringify(data[key], depthTree + 2)}`);
  return ['{', ...result, `${bracketIndent}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (diff, depth) => {
    const replacer = ' '.repeat(2);
    const currentIndent = replacer.repeat(depth);
    const bracketIndent = replacer.repeat(depth - 1);
    const result = diff.map((obj) => {
      if (obj.type === 'nested') {
        return `${currentIndent}${signed(obj)}${obj.key}: ${iter(obj.children, depth + 2)}`;
      }
      if (obj.status === 'changed') {
        return `${currentIndent}- ${obj.key}: ${stringify(obj.value[0], depth)}\n${currentIndent}+ ${obj.key}: ${stringify(obj.value[1], depth)}`;
      }
      return `${currentIndent}${signed(obj)}${obj.key}: ${stringify(obj.value, depth)}`;
    });
    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };
  return iter(tree, 1);
};

export default stylish;
