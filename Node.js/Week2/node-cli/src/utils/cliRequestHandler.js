'use strict';

import { generateNewUserId, generateNewPostId } from './newIdHandler.js';
import { getUsers, getUserById, addUser, updateUser, deleteUser } from '../user/userHandler.js';
import { getPosts, getPostById, addPost, updatePost, deletePost } from '../post/postHandler.js';

/**
 * This function handles the CLI request
 *
 * @param {object} options
 */
export const requestHandler = async (options) => {
  const { resource, method, id } = options;

  const newPost = {
    post_id: generateNewPostId(),
    user_id: 11,
    post_text: 'Phasellus in felis.',
    post_date: '4/20/2021',
    likes: 11111,
    comments: 111,
    hashtags: '#followme',
    location: 'Milan',
    post_image: 'https://robohash.org/ipsumullamaut.png?size=50x50&set=set1',
  };

  const newUser = {
    id: generateNewUserId(),
    first_name: 'User',
    last_name: 'Test',
    email: 'test@example.com',
    gender: 'Female',
  };

  switch (resource) {
    case 'users':
      switch (method) {
        case 'GET':
          if (id) {
            const user = await getUserById(id);
            if (user) {
              console.log('User:');
              console.log(user);
            } else {
              console.log(`No user found with id ${id}`);
            }
          } else {
            const users = await getUsers();
            console.log('Users:');
            console.log(users);
          }
          break;

        case 'POST':
          await addUser(newUser);

          console.log('New user created successfully:');
          console.log(newUser);
          break;

        case 'PATCH':
          if (id) {
            const userToUpdate = await getUserById(id);

            if (userToUpdate) {
              // Params to update
              userToUpdate.first_name = 'New first name';
              userToUpdate.last_name = 'Some crazy last name';
              userToUpdate.email = 'newemail@example.com';

              await updateUser(userToUpdate);

              console.log('User updated successfully:');
              console.log(userToUpdate);
            } else {
              console.log(`No user found with id ${id}`);
            }
          } else {
            console.log('No user id is specified');
          }
          break;

        case 'DELETE':
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
          break;

        default:
          console.log('Invalid method specified.');
          break;
      }
      break;

    case 'posts':
      switch (method) {
        case 'GET':
          if (id) {
            const post = await getPostById(id);
            if (post) {
              console.log('Post:');
              console.log(post);
            } else {
              console.log(`No post found with id ${id}`);
            }
          } else {
            const posts = await getPosts();
            console.log('Posts:');
            console.log(posts);
          }
          break;

        case 'POST':
          await addPost(newPost);

          console.log('New post created successfully:');
          console.log(newPost);
          break;

        case 'PATCH':
          if (id) {
            const postToUpdate = await getPostById(id);

            if (postToUpdate) {
              // Params to update
              postToUpdate.location = 'Some crazy new location';

              await updatePost(postToUpdate);

              console.log('Post updated successfully:');
              console.log(postToUpdate);
            } else {
              console.log(`No post found with id ${id}`);
            }
          } else {
            console.log('No post id is specified');
          }
          break;

        case 'DELETE':
          if (id) {
            const postToDelete = await getPostById(id);

            if (postToDelete) {
              await deletePost(id);

              console.log(`Post with id ${id} deleted successfully.`);
            } else {
              console.log(`No post found with id ${id}`);
            }
          } else {
            console.log('No post id is specified');
          }
          break;

        default:
          console.log('Invalid method specified.');
          break;
      }
      break;

    default:
      console.log('Invalid resource specified.');
      break;
  }
};
