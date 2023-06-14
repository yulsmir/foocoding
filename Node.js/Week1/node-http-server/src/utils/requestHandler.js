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

  const data = {
    error: ReasonPhrases.OK,
    message: 'success',
  };

  switch (path) {
    case 'users': {
      const body = await getRequestData(request);

      const usersPattern = new URLPattern({ pathname: '/users/:id' });
      const usersEndpoint = usersPattern.exec(fullEndpoint);

      const idIdentifier = '/users/';
      const idIndex = url.indexOf(idIdentifier);
      const idStartIndex = idIndex + idIdentifier.length;
      const id = parseInt(url.slice(idStartIndex));

      switch (method) {
        case 'POST':
          response.statusCode = StatusCodes.CREATED;
          data.error = ReasonPhrases.CREATED;
          data.message = 'New user added';
          break;

        case 'GET':
          if (id) {
            response.statusCode = StatusCodes.OK;
            data.error = ReasonPhrases.OK;
            data.message = `Getting user by id ${id}`;
          } else {
            data.error = ReasonPhrases.OK;
            data.message = `Getting ALL Users`;
          }
          break;

        case 'PATCH':
          if (id) {
            response.statusCode = StatusCodes.CREATED;
            data.error = ReasonPhrases.CREATED;
            data.message = `Editing user by id ${id}`;
          } else {
            data.error = ReasonPhrases.NOT_FOUND;
            response.statusCode = StatusCodes.NOT_FOUND;
            data.message = `No user id is specified`;
          }
          break;

        case 'DELETE':
          if (id) {
            response.statusCode = StatusCodes.ACCEPTED;
            data.error = ReasonPhrases.ACCEPTED;
            data.message = `Deleted user by id ${id}`;
          } else {
            data.error = ReasonPhrases.response.statusCode = StatusCodes.BAD_REQUEST;
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
      // const id = postsEndpoint?.pathname?.groups?.id;

      // console.log(`dealing with posts - id: ${postsEndpoint.pathname.groups.id}`);
      const idIdentifier = '/posts/';
      const idIndex = url.indexOf(idIdentifier);
      const idStartIndex = idIndex + idIdentifier.length;
      const id = parseInt(url.slice(idStartIndex));

      switch (method) {
        case 'POST':
          response.statusCode = StatusCodes.CREATED;
          data.error = ReasonPhrases.CREATED;
          data.message = 'New post added';
          break;

        case 'GET':
          if (id) {
            response.statusCode = StatusCodes.OK;
            data.error = ReasonPhrases.OK;
            data.message = `Getting post by id ${id}`;
          } else {
            data.error = ReasonPhrases.OK;
            data.message = `Getting ALL Posts`;
          }
          break;

        case 'PATCH':
          if (id) {
            response.statusCode = StatusCodes.CREATED;
            data.error = ReasonPhrases.CREATED;
            data.message = `Editing post by id ${id}`;
          } else {
            data.error = ReasonPhrases.NOT_FOUND;
            response.statusCode = StatusCodes.NOT_FOUND;
            data.message = `No post id is specified`;
          }
          break;

        case 'DELETE':
          if (id) {
            response.statusCode = StatusCodes.ACCEPTED;
            data.error = ReasonPhrases.ACCEPTED;
            data.message = `Deleted post by id ${id}`;
          } else {
            data.error = ReasonPhrases.response.statusCode = StatusCodes.BAD_REQUEST;
            data.message = `No post id is specified`;
          }
          break;

        default:
          break;
      }
      break;
    }
  }

  response.setHeader('Content-Type', 'application/json');
  // response.statusCode = StatusCodes.OK;

  response.write(JSON.stringify(data));
  response.end();
};
