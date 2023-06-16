'use strict';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { IncomingMessage, ServerResponse } from 'http';
// import { URLPattern } from 'url-pattern';

import { readJsonFile, writeJsonFile } from './fileHandler.js';
import { generateNewUserId, generateNewPostId } from './newIdHandler.js';
import { getUsers, getUserById, addUser, updateUser, deleteUser } from '../user/userHandler.js';
import { getPosts, getPostById, addPost, updatePost, deletePost } from '../post/postHandler.js';

/**
 * This function manages a HTTP request
 *
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
export const requestHandler = async (request, response) => {
  const { headers, method, url } = request;
  const { address, port } = request.socket.server.address();
  const fullEndpoint = `http://${address}:${port}${url}`;
  const path = url.split('/')[1];

  let data = {
    status: ReasonPhrases.OK,
    message: 'success',
  };

  response.setHeader('Content-Type', 'application/json');

  const handleUserRequest = async () => {
    const usersPattern = new URLPattern({ pathname: '/users/:id' });
    const usersEndpoint = usersPattern.exec(fullEndpoint);
    const id = usersEndpoint?.pathname?.groups?.id;
    const usersData = await readJsonFile('./data/users.json');
    const users = JSON.parse(usersData);

    switch (method) {
      case 'GET':
        if (id) {
          const user = await getUserById(id);
          response.statusCode = StatusCodes.OK;
          response.end(JSON.stringify(user));
        } else {
          const users = await getUsers();
          response.statusCode = StatusCodes.OK;
          response.end(JSON.stringify({ users }));
        }
        break;

      case 'POST':
        const newUser = {
          id: generateNewUserId(users),
          first_name: 'User',
          last_name: 'Test',
          email: 'test.user@email.com',
          gender: 'Female',
        };

        await addUser(newUser);

        response.statusCode = StatusCodes.CREATED;
        response.end(JSON.stringify({ user: newUser }));
        break;

      case 'PATCH':
        if (id) {
          const userToUpdate = await getUserById(id);

          if (userToUpdate) {
            // Params to update
            // userToUpdate.first_name = 'New first name';
            // userToUpdate.last_name = 'Some crazy last name';
            userToUpdate.email = 'somenew@email.com';

            await updateUser(userToUpdate);

            response.statusCode = StatusCodes.CREATED;
            response.end(JSON.stringify({ updatedUser: userToUpdate }));
          } else {
            data.status = ReasonPhrases.NOT_FOUND;
            response.statusCode = StatusCodes.NOT_FOUND;
            data.message = `No user found with id ${id}`;
            response.end(JSON.stringify({ data }));
          }
        } else {
          data.status = ReasonPhrases.NOT_FOUND;
          response.statusCode = StatusCodes.NOT_FOUND;
          data.message = `No user id is specified`;
          response.end(JSON.stringify({ data }));
        }
        break;

      case 'DELETE':
        if (id) {
          const userToDelete = await getUserById(id);

          if (userToDelete) {
            await deleteUser(id);

            response.statusCode = StatusCodes.NO_CONTENT;
            data.status = ReasonPhrases.NO_CONTENT;
            data.message = `User with id ${id} is deleted successfully`;
            response.end(JSON.stringify({ data }));
          } else {
            data.status = ReasonPhrases.NOT_FOUND;
            response.statusCode = StatusCodes.NOT_FOUND;
            data.message = `No user found with id ${id}`;
            response.end(JSON.stringify({ data }));
          }
        } else {
          data.status = ReasonPhrases.BAD_REQUEST;
          response.statusCode = StatusCodes.BAD_REQUEST;
          data.message = `No user id is specified`;
          response.end(JSON.stringify({ data }));
        }
        break;

      default:
        break;
    }
  };

  const handlePostRequest = async () => {
    const postsPattern = new URLPattern({ pathname: '/posts/:id' });
    const postsEndpoint = postsPattern.exec(fullEndpoint);
    const id = postsEndpoint?.pathname?.groups?.id;
    const postsData = await readJsonFile('./data/posts.json');
    const posts = JSON.parse(postsData);

    switch (method) {
      case 'GET':
        if (id) {
          const post = await getPostById(id);
          response.statusCode = StatusCodes.OK;
          response.end(JSON.stringify(post));
        } else {
          const posts = await getPosts();
          response.statusCode = StatusCodes.OK;
          response.end(JSON.stringify({ posts }));
        }
        break;

      case 'POST':
        const newPost = {
          post_id: generateNewPostId(posts),
          user_id: 11,
          post_text: 'Phasellus in felis. ',
          post_date: '4/20/2021',
          likes: 11111,
          comments: 111,
          hashtags: '#followme',
          location: 'Milan',
          post_image: 'https://robohash.org/ipsumullamaut.png?size=50x50&set=set1',
        };

        await addPost(newPost);

        response.statusCode = StatusCodes.CREATED;
        response.end(JSON.stringify({ newPost: newPost }));
        break;

      case 'PATCH':
        if (id) {
          const postToUpdate = await getPostById(id);

          if (postToUpdate) {
            // Params to update
            postToUpdate.location = 'Some crazy new location';
            // postToUpdate.post_text = 'Some new text';
            // postToUpdate.hashtags = '#newhashtag';

            await updatePost(postToUpdate);

            response.statusCode = StatusCodes.CREATED;
            response.end(JSON.stringify({ updatedPost: postToUpdate }));
          } else {
            data.status = ReasonPhrases.NOT_FOUND;
            response.statusCode = StatusCodes.NOT_FOUND;
            data.message = `No post found with id ${id}`;
            response.end(JSON.stringify({ data }));
          }
        } else {
          data.status = ReasonPhrases.NOT_FOUND;
          response.statusCode = StatusCodes.NOT_FOUND;
          data.message = `No post id is specified`;
          response.end(JSON.stringify({ data }));
        }
        break;

      case 'DELETE':
        if (id) {
          const postToDelete = await getPostById(id);

          if (postToDelete) {
            await deletePost(id);

            response.statusCode = StatusCodes.NO_CONTENT;
            data.status = ReasonPhrases.NO_CONTENT;
            data.message = `Post with id ${id} is deleted successfully`;
            response.end(JSON.stringify({ data }));
          } else {
            data.status = ReasonPhrases.NOT_FOUND;
            response.statusCode = StatusCodes.NOT_FOUND;
            data.message = `No post found with id ${id}`;
            response.end(JSON.stringify({ data }));
          }
        } else {
          data.status = ReasonPhrases.BAD_REQUEST;
          response.statusCode = StatusCodes.BAD_REQUEST;
          data.message = `No post id is specified`;
          response.end(JSON.stringify({ data }));
        }
        break;

      default:
        break;
    }
  };

  switch (path) {
    case 'users':
      await handleUserRequest();
      break;

    case 'posts':
      await handlePostRequest();
      break;

    default:
      break;
  }
};
