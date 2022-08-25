import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getPath(filepath));
const gendiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFile(filepath1));
  const file2 = JSON.parse(readFile(filepath2));
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.union(keys1, keys2).sort();
  const result = keys.map((key) => {
    if (!Object.hasOwn(file1, key)) {
      return `  + ${key}: ${file2[key]}`;
    }
    if (!Object.hasOwn(file2, key)) {
      return `  - ${key}: ${file1[key]}`;
    }
    if (file1[key] === file2[key]) {
      return `    ${key}: ${file1[key]}`;
    } return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
  });
  return ['{', ...result, '}'].join('\n');
};

export default gendiff;
