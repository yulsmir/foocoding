'user strict';

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

const main = async () => {
  console.log('Hello! Choose options to access API:\n');

  const resourceAnswer = await question('What resource do you want to work with? (users/posts): ');
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
          console.log('Invalid resource specified.');
      }
  }
};

main();
