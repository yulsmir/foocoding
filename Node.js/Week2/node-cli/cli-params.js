import { parseArgs } from 'node:util';
import {
  displayUsers,
  displayUserById,
  addUserPrompt,
  updateUserPrompt,
  deleteUserPrompt,
  displayPosts,
  displayPostById,
  addPostPrompt,
  updatePostPrompt,
  deletePostPrompt,
  question,
} from './src/utils/cliPromptHandler.js';

const options = {
  resource: { type: 'string' },
  method: { type: 'string' },
  all: { type: 'boolean' },
  id: { type: 'string' },
};

const { values } = parseArgs({
  options,
  tokens: true,
  strict: false,
});

const resource = values.resource;
const method = values.method;
const all = values.all;
const id = values.id;

switch (resource) {
  case 'users':
    switch (method) {
      case 'GET':
        if (all) {
          displayUsers();
        }
        if (id) {
          displayUserById();
        }
        break;

      case 'POST':
        addUserPrompt();
        break;

      case 'PATCH':
        if (id) {
          updateUserPrompt();
        } else {
          console.log('Invalid parameters for PATCH method.');
        }
        break;

      case 'DELETE':
        if (id) {
          deleteUserPrompt();
        } else {
          console.log('Invalid parameters for DELETE method.');
        }
        break;

      default:
        console.log('Invalid method specified.');
    }
    break;

  case 'posts': {
    switch (method) {
      case 'GET':
        if (all) {
          displayPosts();
        }
        if (id) {
          displayPostById();
        } else {
          console.log('Invalid parameters for GET method.');
        }
        break;

      case 'POST':
        addPostPrompt();
        break;

      case 'PATCH':
        if (id) {
          updatePostPrompt();
        } else {
          console.log('Invalid parameters for PATCH method.');
        }
        break;

      case 'DELETE':
        if (id) {
          deletePostPrompt();
        } else {
          console.log('Invalid parameters for DELETE method.');
        }
        break;

      default:
        console.log('Invalid method specified.');
    }
  }
}