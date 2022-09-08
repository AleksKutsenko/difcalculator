import stylish from './stylish.js';
import getPlain from './plain.js';
import getJson from './json.js';

const format = (tree, formatName) => {
  switch (formatName) {
    case 'json':
      return getJson(tree);
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return getPlain(tree);
    default:
      return ('Error');
  }
};

export default format;
