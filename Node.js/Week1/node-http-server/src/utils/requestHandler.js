'use strict';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

// import { getRequestData } from './getRequestData.js';
import { readJsonFile, writeJsonFile } from './fileHandler.js';
import { IncomingMessage, ServerResponse } from 'http';
import { generateNewUserId, generateNewPostId } from './newIdHandler.js';

/**
 * This function manage a HTTP request
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

  switch (path) {
    case 'users': {
      // const body = await getRequestData(request);
      const usersPattern = new URLPattern({ pathname: '/users/:id' });
      const usersEndpoint = usersPattern.exec(fullEndpoint);
      const id = usersEndpoint?.pathname?.groups?.id;
      const usersData = await readJsonFile('./data/users.json');
      const users = JSON.parse(usersData);
      const user = users?.find((user) => user.id === parseInt(id));
      const searchIndex = users?.findIndex((user) => user.id === parseInt(id));

      switch (method) {
        case 'GET':
          if (id) {
            response.statusCode = StatusCodes.OK;
            response.end(JSON.stringify(user));
          } else {
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

          users.push(newUser);
          response.setHeader('Content-Type', 'application/json');

          try {
            await writeJsonFile('./data/users.json', users);
            response.statusCode = StatusCodes.CREATED;
            response.end(JSON.stringify({ user: newUser }));
          } catch (err) {
            response.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            response.end(JSON.stringify({ error: 'Failed to add new user' }));
          }
          break;

        case 'PATCH':
          if (id) {
            if (searchIndex !== users.length) {
              const userToUpDate = users[searchIndex];
              // Params to update
              // userToUpDate.first_name = 'New first name';
              // userToUpDate.last_name = 'Some crazy last name';

              userToUpDate.email = 'somenew@email.com';
              try {
                await writeJsonFile('./data/users.json', users);
                response.statusCode = StatusCodes.CREATED;
                response.end(JSON.stringify({ updatedUser: userToUpDate }));
              } catch (err) {
                response.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
                response.end(JSON.stringify({ error: 'Failed to update user' }));
              }
            }
          } else {
            data.status = ReasonPhrases.NOT_FOUND;
            response.statusCode = StatusCodes.NOT_FOUND;
            data.message = `No user id is specified`;
          }
          break;

        case 'DELETE':
          const filteredUsers = users.filter((user) => user.id !== parseInt(id));
          if (filteredUsers.length < users.length) {
            try {
              await writeJsonFile('./data/users.json', filteredUsers);
              response.statusCode = StatusCodes.NO_CONTENT;
              data.status = ReasonPhrases.NO_CONTENT;
              data.message = `User with id ${id} is deleted successfully`;
              response.end(JSON.stringify({ data }));
            } catch (err) {
              response.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
              response.end(JSON.stringify({ error: 'Failed to delete user' }));
            }
          } else {
            data.status = ReasonPhrases.BAD_REQUEST;
            response.statusCode = StatusCodes.BAD_REQUEST;
            data.message = `No user id is specified`;
          }
          break;

        default:
          break;
      }

      break;
    }

    case 'posts': {
      // const body = await getRequestData(request);
      const postsPattern = new URLPattern({ pathname: '/posts/:id' });
      const postsEndpoint = postsPattern.exec(fullEndpoint);
      const id = postsEndpoint?.pathname?.groups?.id;
      const postsData = await readJsonFile('./data/posts.json');
      const posts = JSON.parse(postsData);
      const post = posts?.find((post) => post.post_id === parseInt(id));
      const searchIndex = posts?.findIndex((post) => post.post_id === parseInt(id));

      switch (method) {
        case 'GET':
          if (id) {
            response.statusCode = StatusCodes.OK;
            response.end(JSON.stringify(post));
          } else {
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

          posts.push(newPost);
          response.setHeader('Content-Type', 'application/json');

          try {
            await writeJsonFile('./data/posts.json', posts);
            response.statusCode = StatusCodes.CREATED;
            response.end(JSON.stringify({ updatedPost: newPost }));
          } catch (err) {
            response.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            response.end(JSON.stringify({ error: 'Failed to add new post' }));
          }
          break;

        case 'PATCH':
          if (id) {
            if (searchIndex !== posts.length) {
              const postToUpdate = post;
              // Params to update
              postToUpdate.location = 'Some crazy  new location';
              // postToUpdate.post_text = 'Some new text';
              // postToUpdate.hashtags = '#newhashtag';
              try {
                await writeJsonFile('./data/posts.json', posts);
                response.statusCode = StatusCodes.CREATED;
                response.end(JSON.stringify(postToUpdate));
              } catch (err) {
                response.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
                response.end(JSON.stringify({ error: 'Failed to update post' }));
              }
            }
          } else {
            data.status = ReasonPhrases.NOT_FOUND;
            response.statusCode = StatusCodes.NOT_FOUND;
            data.message = `No post id is specified`;
          }
          break;

        case 'DELETE':
          const filteredPosts = posts.filter((post) => post.id !== parseInt(id));
          if (filteredPosts.length < posts.length) {
            try {
              await writeJsonFile('./data/posts.json', filteredUPosts);
              response.statusCode = StatusCodes.NO_CONTENT;
              data.status = ReasonPhrases.NO_CONTENT;
              data.message = `Post with id ${id} is deleted successfully`;
              response.end(JSON.stringify({ data }));
            } catch (err) {
              response.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
              response.end(JSON.stringify({ error: 'Failed to delete post' }));
            }
          } else {
            data.status = ReasonPhrases.BAD_REQUEST;
            response.statusCode = StatusCodes.BAD_REQUEST;
            data.message = `No post id is specified`;
          }
          break;

        default:
          break;
      }

      break;
    }
  }
};
