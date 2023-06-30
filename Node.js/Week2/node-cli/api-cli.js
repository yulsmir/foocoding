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

const main = async () => {
  if (resource && method) {
    console.log('Command-line arguments detected:');
    Object.entries(values).forEach(([param, value]) => {
      console.log(`${param}: ${value}`);
    });

    switch (resource) {
      case 'users':
        switch (method) {
          case 'GET':
            if (all) {
              await displayUsers();
            } else if (id) {
              await displayUserById();
            } else {
              console.log('Invalid parameters for GET method.');
            }
            break;

          case 'POST':
            await addUserPrompt();
            break;

          case 'PATCH':
            if (id) {
              await updateUserPrompt();
            } else {
              console.log('Invalid parameters for PATCH method.');
            }
            break;

          case 'DELETE':
            if (id) {
              await deleteUserPrompt();
            } else {
              console.log('Invalid parameters for DELETE method.');
            }
            break;

          default:
            console.log('Invalid method specified.');
        }
        break;

      case 'posts':
        switch (method) {
          case 'GET':
            if (all) {
              await displayPosts();
            } else if (id) {
              await displayPostById();
            } else {
              console.log('Invalid parameters for GET method.');
            }
            break;

          case 'POST':
            await addPostPrompt();
            break;

          case 'PATCH':
            if (id) {
              await updatePostPrompt();
            } else {
              console.log('Invalid parameters for PATCH method.');
            }
            break;

          case 'DELETE':
            if (id) {
              await deletePostPrompt();
            } else {
              console.log('Invalid parameters for DELETE method.');
            }
            break;

          default:
            console.log('Invalid method specified.');
        }
        break;

      default:
        console.log('Invalid resource specified.');
    }
  } else {
    console.log('No command-line arguments detected.');

    console.log('Hello! Choose options to access the API:\n');

    const resourceAnswer = await question(
      'What resource do you want to work with? (users/posts): ',
    );
    const resource = resourceAnswer.toLowerCase();

    const methodAnswer = await question(
      'What method do you want to work with? (GET, POST, PATCH, DELETE): ',
    );
    const selectedMethod = methodAnswer.toUpperCase();

    switch (resource) {
      case 'users':
        switch (selectedMethod) {
          case 'GET':
            const getAllAnswer = await question(
              'You chose GET. Do you want to make a GET All request? (y/n): ',
            );

            if (getAllAnswer.toLowerCase() === 'y') {
              await displayUsers();
            } else {
              await displayUserById();
            }
            break;

          case 'POST':
            await addUserPrompt();
            break;

          case 'PATCH':
            await updateUserPrompt();
            break;

          case 'DELETE':
            await deleteUserPrompt();
            break;

          default:
            console.log('Invalid method specified.');
        }
        break;

      case 'posts':
        switch (selectedMethod) {
          case 'GET':
            const getAllAnswer = await question(
              'You chose GET. Do you want to make a GET All request? (y/n): ',
            );

            if (getAllAnswer.toLowerCase() === 'y') {
              await displayPosts();
            } else {
              await displayPostById();
            }
            break;

          case 'POST':
            await addPostPrompt();
            break;

          case 'PATCH':
            await updatePostPrompt();
            break;

          case 'DELETE':
            await deletePostPrompt();
            break;

          default:
            console.log('Invalid method specified.');
        }
        break;

      default:
        console.log('Invalid resource specified.');
    }
  }
};

main();
