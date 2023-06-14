'use strict';

import { readFile } from 'node:fs/promises';

export const readJsonFile = async (filePath) => {
  try {
    const contents = await readFile(filePath, { encoding: 'utf8' });
    console.log(contents);
  } catch (err) {
    console.error(err.message);
  }
};

export const writeJsonFile = async (filePath, data) => {
  return new Promise((success, reject) => {
    // const body = [];
    const fileStream = fs.createWriteStream(filePath, 'utf8');

    const jsonData = JSON.stringify(data, null, 2);

    fileStream.write(jsonData);

    fileStream
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        success();
      });
  });
};

// TEST
const result = await readJsonFile('./data/users.json');
// const write = await writeJsonFile('./data/users.json', 'test'); // TODO: fix so it appends, not rewrites
// const writeFile = console.log(write);
