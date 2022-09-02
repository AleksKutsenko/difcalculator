import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import diff from './diff.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf-8');
const getFormat = (filepath) => path.extname(filepath);
const gendiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const data1 = parser(file1, getFormat(filepath1));
  const data2 = parser(file2, getFormat(filepath2));
  const diffTree = diff(data1, data2);
  return diffTree;
};

export default gendiff;
