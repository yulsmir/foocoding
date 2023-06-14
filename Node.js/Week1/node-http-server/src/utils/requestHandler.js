'use strict';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { getRequestData } from './getRequestData.js';
import { readJsonFile, writeJsonFile } from './fileHandler.js';
import { IncomingMessage, ServerResponse } from 'http';

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

  console.log(url);
  const path = url.split('/')[1];

  let data = {
    status: ReasonPhrases.OK,
    message: 'success',
  };

  response.setHeader('Content-Type', 'application/json');

  switch (path) {
    case 'users': {
      const body = await getRequestData(request);
      const usersPattern = new URLPattern({ pathname: '/users/:id' });
      const usersEndpoint = usersPattern.exec(fullEndpoint);
      const id = usersEndpoint?.pathname?.groups?.id;
      const usersData = await readJsonFile('./data/users.json');
      const users = JSON.parse(usersData);
      const user = users.find((user) => user.id === parseInt(id));

      switch (method) {
        case 'POST':
          const newUser = {
            id: 123456789,
            first_name: 'User',
            last_name: 'Test',
            email: 'test.user@email.com',
            gender: 'Female',
          };

          users.push(newUser);
          response.setHeader('Content-Type', 'application/json');

          try {
            await writeJsonFile('./data/users.json', users); // Write the updated users array to the file
            response.statusCode = StatusCodes.CREATED;
            response.end(JSON.stringify({ user: newUser }));
          } catch (err) {
            response.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            response.end(JSON.stringify({ error: 'Failed to add new user' }));
          }
          break;

        case 'GET':
          if (id) {
            response.statusCode = StatusCodes.OK;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(user));
          } else {
            response.statusCode = StatusCodes.OK;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({ users }));
          }
          break;

        case 'PATCH':
          if (id) {
            response.statusCode = StatusCodes.CREATED;
            data.status = ReasonPhrases.CREATED;
            data.message = `Editing user by id ${id}`;
          } else {
            data.status = ReasonPhrases.NOT_FOUND;
            response.statusCode = StatusCodes.NOT_FOUND;
            data.message = `No user id is specified`;
          }
          break;

        case 'DELETE':
          if (id) {
            response.statusCode = StatusCodes.NO_CONTENT;
            data.status = ReasonPhrases.NO_CONTENT;
            data.message = `Deleted user by id ${id}`;
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
      const body = await getRequestData(request);
      const postsPattern = new URLPattern({ pathname: '/posts/:id' });
      const postsEndpoint = postsPattern.exec(fullEndpoint);
      const id = postsEndpoint?.pathname?.groups?.id;

      // console.log(`dealing with posts - id: ${postsEndpoint.pathname.groups.id}`);

      switch (method) {
        case 'POST':
          response.statusCode = StatusCodes.CREATED;
          data.status = ReasonPhrases.CREATED;
          data.message = 'New post added';
          break;

        case 'GET':
          if (id) {
            response.statusCode = StatusCodes.OK;
            data.status = ReasonPhrases.OK;
            data.message = `Getting post by id ${id}`;
          } else {
            const postsData = await readJsonFile('./data/posts.json');
            const posts = JSON.parse(postsData);
            response.statusCode = StatusCodes.OK;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({ posts }));
          }
          break;

        case 'PATCH':
          if (id) {
            response.statusCode = StatusCodes.CREATED;
            data.status = ReasonPhrases.CREATED;
            data.message = `Editing post by id ${id}`;
          } else {
            data.status = ReasonPhrases.NOT_FOUND;
            response.statusCode = StatusCodes.NOT_FOUND;
            data.message = `No post id is specified`;
          }
          break;

        case 'DELETE':
          if (id) {
            response.statusCode = StatusCodes.NO_CONTENT;
            data.status = ReasonPhrases.NO_CONTENT;
            data.message = `Deleted post by id ${id}`;
          } else {
            data.status = ReasonPhrases.response.statusCode = StatusCodes.NOT_FOUND;
            data.message = `No post id is specified`;
          }
          break;

        default:
          break;
      }
      break;
    }
  }

  // TODO: move all to separate functions
  // TODO: add dataCheckFunction before any other actions
  // switch (path) {
  //   case 'users': {
  //     if (method === 'GET') {
  //       await handleGetUser(request, response);
  //     } else if (method === 'POST') {
  //       await handlePostUser(request, response);
  //     } else if
  //     break;
  //   }

  //   case 'posts': {
  //     if (method === 'GET') {
  //       await handleGetPost(request, response);
  //     } else if (method === 'POST') {
  //       await handlePostPost(request, response);
  //     }
  //     break;
  //   }
  // }

  // response.statusCode = StatusCodes.OK;

  // response.write(JSON.stringify(data));
  // response.end();
};
