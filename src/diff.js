import _ from 'lodash';

const Nested = (key, type, status, children) => {
  const object = {
    key, type, status, children,
  };
  return object;
};
const Plain = (key, type, status, value) => {
  const object = {
    key, type, status, value,
  };
  return object;
};

const diff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();
  const tree = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!Object.hasOwn(data1, key)) {
      return Plain(key, 'plain', 'added', value2);
    }
    if (!Object.hasOwn(data2, key)) {
      return Plain(key, 'plain', 'deleted', value1);
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return Nested(key, 'nested', 'changed', diff(value1, value2));
    }
    if (value1 === value2) {
      return Plain(key, 'plain', 'unchanged', value1);
    }
    return Plain(key, 'plain', 'changed', [value1, value2]);
  });
  return tree;
};

export default diff;
