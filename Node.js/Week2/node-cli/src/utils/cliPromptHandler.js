import { getUsers, getUserById, addUser, updateUser, deleteUser } from '../user/userHandler.js';
import { getPosts, getPostById, addPost, updatePost, deletePost } from '../post/postHandler.js';

import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { parseArgs } from 'node:util';

export const question = async (query) => {
  const readline = createInterface({
    input: stdin,
    output: stdout,
  });

  const answer = await readline.question(query);
  readline.close();

  return answer;
};

const { values } = parseArgs({});

export const options = {
  resource: { type: 'string' },
  method: { type: 'string' },
  all: { type: 'boolean' },
};

export const displayUsers = async () => {
  const users = await getUsers();
  console.log('Users:');
  console.log(users);
};

export const displayUserById = async () => {
  const idAnswer = await question('Please enter the ID for the GET By ID request: ');
  const intIdAnswer = parseInt(idAnswer);
  const user = await getUserById(intIdAnswer);
  if (user) {
    console.log('User:');
    console.log(user);
  } else {
    console.log(`No user found with id ${intIdAnswer}`);
  }
};

export const addUserPrompt = async () => {
  const userFields = ['first_name', 'last_name', 'email', 'gender'];
  const userFieldValues = {};

  for (const field of userFields) {
    const answer = await question(`Enter ${field}: `);
    userFieldValues[field] = answer;
  }

  await addUser(userFieldValues);

  console.log('User Details:');
  console.log(userFieldValues);
};

export const updateUserPrompt = async () => {
  const idAnswer = await question('Please enter the ID for the user you want to update: ');
  const intIdAnswer = parseInt(idAnswer);

  const userToUpdate = await getUserById(intIdAnswer);
  if (idAnswer) {
    const userToUpdate = await getUserById(intIdAnswer);

    if (userToUpdate) {
      const userFieldsToUpdate = ['first_name', 'last_name', 'email', 'gender'];
      const userFieldValuesToUpdate = {};

      for (const field of userFieldsToUpdate) {
        const answer = await question(`Enter new ${field}: `);
        userFieldValuesToUpdate[field] = answer;
      }

      const updatedUser = { ...userToUpdate, ...userFieldValuesToUpdate };

      await updateUser(updatedUser);

      console.log('The user was updated successfully.');
      console.log('Updated User:');
      console.log(updatedUser);
    } else {
      console.log(`No user found with ID ${intIdAnswer}.`);
    }
  }
};

export const deleteUserPrompt = async () => {
  const id = await question('Enter the ID of the user to delete: ');
  if (id) {
    const userToDelete = await getUserById(id);

    if (userToDelete) {
      await deleteUser(id);

      console.log(`User with id ${id} deleted successfully.`);
    } else {
      console.log(`No user found with id ${id}`);
    }
  } else {
    console.log('No user id is specified');
  }
};

export const displayPosts = async () => {
  const posts = await getPosts();
  console.log('All posts:');
  console.log(posts);
};

export const displayPostById = async () => {
  const idAnswer = await question('Please enter the ID for the GET By ID request: ');

  const post = await getPostById(idAnswer);

  if (post) {
    console.log('Post found:');
    console.log(post);
  } else {
    console.log('Post not found.');
  }
};

export const addPostPrompt = async () => {
  const postFields = ['title', 'body', 'userId'];
  const postFieldValues = {};

  for (const field of postFields) {
    const answer = await question(`Enter ${field}: `);
    postFieldValues[field] = answer;
  }

  await addPost(postFieldValues);

  console.log('The new post was created successfully.');
};

export const updatePostPrompt = async () => {
  const idToUpdate = await question('Enter the ID of the post to update: ');

  const existingPost = await getPostById(idToUpdate);

  if (existingPost) {
    const updatedFields = {};

    for (const field in existingPost) {
      if (field !== 'post_id') {
        const answer = await question(`Enter new ${field} (current: ${existingPost[field]}): `);
        updatedFields[field] = answer;
      }
    }

    const updatedPost = { ...existingPost, ...updatedFields };
    await updatePost(updatedPost);

    console.log(`Post with ID ${idToUpdate} has been updated successfully.`);
  } else {
    console.log(`Post with ID ${idToUpdate} does not exist.`);
  }
};

export const deletePostPrompt = async () => {
  const idToDelete = await question('Enter the ID of the post to delete: ');

  await deletePost(idToDelete);

  console.log(`Post with ID ${idToDelete} has been deleted successfully.`);
};
