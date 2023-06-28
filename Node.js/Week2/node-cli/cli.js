import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { openSync, readSync, writeSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { requestHandler } from './src/utils/cliRequestHandler.js';

import { getUserById, updateUser } from './src/user/userHandler.js';

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
  resource: { type: 'string' },
  method: { type: 'string' },
  all: { type: 'boolean' },
};

const { resource, method, all } = values;

const main = async () => {
  console.log('Hello! Choose options to access API:\n');

  const resourceAnswer = await question('What resource do you want to work with? (users/posts): ');
  const selectedResource = resourceAnswer.toLowerCase();

  const methodAnswer = await question(
    'What method do you want to work with? (GET, POST, PATCH, DELETE): ',
  );
  const selectedMethod = methodAnswer.toUpperCase();

  switch (selectedResource) {
    case 'users':
      switch (selectedMethod) {
        case 'GET':
          const getAllAnswer = await question(
            'You chose GET. Do you want to make a GET All request? (y/n): ',
          );

          if (getAllAnswer.toLowerCase() === 'y') {
            const response = await requestHandler({
              method: 'GET',
              resource: 'users',
            });

            console.log('Response:');
            console.log(response);
          } else {
            const idAnswer = await question('Please enter the ID for the GET By ID request: ');
            const intIdAnswer = parseInt(idAnswer);
            const response = await requestHandler({
              resource: 'users',
              id: intIdAnswer,
              method: 'GET',
            });
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
            resource: 'users',
            method: 'POST',
            body: userFieldValues,
          });

          console.log('The new user was created successfully.');
          console.log('Response:');
          console.log(userResponse);
          // console.log('Server error occurred.');
          break;
        case 'PATCH':
          const idAnswer = await question('Please enter the ID for the user you want to update: ');
          const intIdAnswer = parseInt(idAnswer);

          const userToUpdate = await getUserById(intIdAnswer);

          if (userToUpdate) {
            const userFieldsToUpdate = ['first_name', 'last_name', 'email', 'gender'];
            const userFieldValuesToUpdate = {};

            for (const field of userFieldsToUpdate) {
              const answer = await question(`Enter new ${field}: `);
              userFieldValuesToUpdate[field] = answer;
            }

            // Update the user object with the new values
            const updatedUser = { ...userToUpdate, ...userFieldValuesToUpdate };

            // Call the updateUser function to update the user in the data source
            await updateUser(updatedUser);

            console.log('The user was updated successfully.');
            console.log('Updated User:');
            console.log(updatedUser);
          } else {
            console.log(`No user found with ID ${intIdAnswer}.`);
          }
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
