'use strict';

import { readFile, writeFile } from 'node:fs/promises';

export const readJsonFile = async (filePath) => {
  try {
    return await readFile(filePath, { encoding: 'utf8' });
  } catch (err) {
    console.error(err.message);
  }
};

export const writeJsonFile = async (filePath, data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    return await writeFile(filePath, jsonData, 'utf8');
  } catch (err) {
    console.error(err.message);
  }
};
