import stylish from './stylish.js';
import getPlain from './plain.js';

const format = (tree, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return getPlain(tree);
    default:
      return ('Error');
  }
};

export default format;
