import { openSync, readSync, writeSync } from 'node:fs';

export const readJsonFileSync = (filePath) => {
  const fd = openSync(filePath, 'r');
  const bufferSize = 1024;
  const buffer = Buffer.alloc(bufferSize);
  let bytesRead = 0;
  let data = '';

  while ((bytesRead = readSync(fd, buffer, 0, bufferSize)) !== 0) {
    data += buffer.toString('utf-8', 0, bytesRead);
  }

  return data;
};

export const writeJsonFileSync = (filePath, data) => {
  const fd = openSync(filePath, 'w');
  const buffer = Buffer.from(JSON.stringify(data), 'utf-8');

  writeSync(fd, buffer, 0, buffer.length);
};

export const readJsonFile = async (filePath) => {
  return readJsonFileSync(filePath);
};

export const writeJsonFile = async (filePath, data) => {
  writeJsonFileSync(filePath, data);
};
