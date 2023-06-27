'use strict';

import { readJsonFile, writeJsonFile } from '../utils/fileHandler.js';

export const getUsers = async () => {
  const usersData = await readJsonFile('../data/users.json');
  return JSON.parse(usersData);
};

export const getUserById = async (id) => {
  const usersData = await readJsonFile('./data/users.json');
  const users = JSON.parse(usersData);
  return users.find((user) => user.id === parseInt(id));
};

export const addUser = async (user) => {
  const users = await getUsers();
  users.push(user);
  await writeJsonFile('./data/users.json', users);
};

export const updateUser = async (updatedUser) => {
  const users = await getUsers();
  const index = users.findIndex((user) => user.id === updatedUser.id);
  users[index] = updatedUser;
  await writeJsonFile('./data/users.json', users);
};

export const deleteUser = async (id) => {
  const users = await getUsers();
  const filteredUsers = users.filter((user) => user.id !== parseInt(id));
  await writeJsonFile('./data/users.json', filteredUsers);
};
