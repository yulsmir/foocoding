import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { openSync, readSync, writeSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { requestHandler } from './src/utils/cliRequestHandler.js';

import { getUserById, updateUser, addUser, deleteUser } from './src/user/userHandler.js';
import { getPosts, getPostById, addPost, updatePost, deletePost } from './src/post/postHandler.js';

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

          // Call the addUser function to add the new user to the data source
          await addUser(userFieldValues);

          console.log('The new user was created successfully.');
          console.log('User Details:');
          console.log(userFieldValues);
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
          const idToDelete = await question('Enter the ID of the user to delete: ');

          await deleteUser(idToDelete);

          console.log(`User with ID ${idToDelete} has been deleted successfully.`);
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
            // Call the getPosts function to retrieve all posts
            const posts = await getPosts();

            console.log('All posts:');
            console.log(posts);
          } else {
            const idAnswer = await question('Please enter the ID for the GET By ID request: ');

            // Call the getPostById function to retrieve the post by its ID
            const post = await getPostById(idAnswer);

            if (post) {
              console.log('Post found:');
              console.log(post);
            } else {
              console.log('Post not found.');
            }
          }
          break;

        case 'POST':
          const postFields = ['title', 'body', 'userId'];
          const postFieldValues = {};

          for (const field of postFields) {
            const answer = await question(`Enter ${field}: `);
            postFieldValues[field] = answer;
          }

          // Call the addPost function to add a new post
          await addPost(postFieldValues);

          console.log('The new post was created successfully.');
          break;

        case 'PATCH':
          const idToUpdate = await question('Enter the ID of the post to update: ');

          // Retrieve the existing post by its ID
          const existingPost = await getPostById(idToUpdate);

          if (existingPost) {
            const updatedFields = {};

            for (const field in existingPost) {
              if (field !== 'post_id') {
                const answer = await question(
                  `Enter new ${field} (current: ${existingPost[field]}): `,
                );
                updatedFields[field] = answer;
              }
            }

            const updatedPost = { ...existingPost, ...updatedFields };

            // Call the updatePost function to update the post
            await updatePost(updatedPost);

            console.log(`Post with ID ${idToUpdate} has been updated successfully.`);
          } else {
            console.log(`Post with ID ${idToUpdate} does not exist.`);
          }
          break;

        case 'DELETE':
          const idToDelete = await question('Enter the ID of the post to delete: ');

          // Call the deletePost function to delete the post
          await deletePost(idToDelete);

          console.log(`Post with ID ${idToDelete} has been deleted successfully.`);
          break;
        default:
          console.log('Invalid resource specified.');
      }
  }
};

main();
