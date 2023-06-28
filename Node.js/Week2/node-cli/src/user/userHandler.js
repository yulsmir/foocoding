'use strict';

import {
  readJsonFile,
  writeJsonFile,
  readJsonFileSync,
  writeJsonFileSync,
} from '../utils/cliFileHandler.js';

const filePath = 'data/users.json';

export const getUsers = async () => {
  const usersData = await readJsonFile(filePath);
  return JSON.parse(usersData);
};

export const getUserById = async (id) => {
  const usersData = await readJsonFile(filePath);
  const users = JSON.parse(usersData);
  return users.find((user) => user.id === parseInt(id));
};

export const addUser = async (user) => {
  const users = await getUsers();
  users.push(user);
  await writeJsonFile(filePath, users);
};

export const updateUser = async (updatedUser) => {
  const users = await getUsers();
  const index = users.findIndex((user) => user.id === updatedUser.id);
  users[index] = updatedUser;
  await writeJsonFile(filePath, users);
};

export const deleteUser = async (id) => {
  const users = await getUsers();
  const filteredUsers = users.filter((user) => user.id !== parseInt(id));
  await writeJsonFile(filePath, filteredUsers);
};
