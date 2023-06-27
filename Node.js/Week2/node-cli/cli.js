import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { openSync, readSync, writeSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { requestHandler } from './src/utils/cliRequestHandler.js';

const question = async (query) => {
  const readline = createInterface({
    input: stdin,
    output: stdout,
  });

  const answer = await readline.question(query);
  readline.close();

  return answer;
};

const { values } = parseArgs({});

const options = {
  resource: { type: 'string', default: 'users' },
  method: { type: 'string', default: 'GET' },
  all: { type: 'boolean' },
};

const { resource, method, all } = values;

const main = async () => {
  console.log('Hello! Make a choice to proceed:\n');

  const resourceAnswer =
    resource || (await question('What resource do you want to work with? (users/posts): '));
  const selectedResource = resourceAnswer.toLowerCase();

  const methodAnswer =
    method ||
    (await question('What method do you want to work with? (GET, POST, PATCH, DELETE): '));
  const selectedMethod = methodAnswer.toUpperCase();

  switch (selectedResource) {
    case 'users':
      switch (selectedMethod) {
        case 'GET':
          const getAllAnswer =
            all ||
            (await question('You chose GET. Do you want to make a GET All request? (y/n): '));

          if (getAllAnswer.toLowerCase() === 'y') {
            const response = await requestHandler({
              method: 'GET',
              url: '/users',
            });

            console.log('Response:');
            console.log(response);
          } else {
            const idAnswer = await question('Please enter the ID for the GET By ID request: ');

            const response = await requestHandler({
              method: 'GET',
              url: `/users/${idAnswer}`,
            });

            console.log('Response:');
            console.log(response);
          }
          break;
        case 'POST':
          const userFields = ['first_name', 'last_name', 'email', 'gender'];
          const userFieldValues = {};

          for (const field of userFields) {
            const answer = await question(`Enter ${field}: `);
            userFieldValues[field] = answer;
          }

          const userResponse = await requestHandler({
            method: 'POST',
            url: '/users',
            body: userFieldValues,
          });

          if (userResponse.statusCode === 201) {
            console.log('The new user was created successfully.');
            console.log('Response:');
            console.log(userResponse);
          } else {
            console.log('Server error occurred.');
          }
          break;
        case 'PATCH':
          // PATCH method logic for users
          console.log('PATCH user');
          break;
        case 'DELETE':
          // DELETE method logic for users
          console.log('delete user');
          break;
        default:
          console.log('Invalid method specified.');
      }
      break;
    case 'posts':
      switch (selectedMethod) {
        case 'GET':
          // GET method logic for posts
          break;
        case 'POST':
          const postFields = ['title', 'body', 'userId'];
          const postFieldValues = {};

          for (const field of postFields) {
            const answer = await question(`Enter ${field}: `);
            postFieldValues[field] = answer;
          }

          const postResponse = await requestHandler({
            method: 'POST',
            url: '/posts',
            body: postFieldValues,
          });

          if (postResponse.statusCode === 201) {
            console.log('The new post was created successfully.');
            console.log('Response:');
            console.log(postResponse);
          } else {
            console.log('Server error occurred.');
          }
          break;
        case 'PATCH':
          // PATCH method logic for posts
          break;
        case 'DELETE':
          // DELETE method logic for posts
          break;
        default:
          console.log('Invalid method specified.');
      }
      break;
    default:
      console.log('Invalid resource specified.');
  }
};

main();
