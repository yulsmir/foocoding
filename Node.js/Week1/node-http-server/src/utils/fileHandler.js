'use strict';

import fs from 'fs';
// import { open } from 'node:fs/promises';

export const readJsonFile = async (filePath) => {
  return new Promise((success, reject) => {
    const body = [];
    const fileStream = fs.createReadStream(filePath, 'utf8');

    fileStream
      .on('error', (err) => {
        reject(err);
      })
      .on('data', (chunk) => {
        body.push(chunk);
      })
      .on('end', () => {
        const jsonData = JSON.parse(body.join(''));
        success(jsonData);
      });
  });
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
// const result = await readJsonFile('./data/users.json');
// const write = await writeJsonFile('./data/users.json', 'test'); // TODO: fix so it appends, not rewrites
// const writeFile = console.log(write);
