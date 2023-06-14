import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { getRequestData } from './getRequestData.js';
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
      const usersPattern = new URLPattern({ pathname: '/users/:id' });
      const usersEndpoint = usersPattern.exec(fullEndpoint);
      const id = usersEndpoint?.pathname?.groups?.id;
      const body = await getRequestData(request);

      switch (method) {
        case 'POST':
          console.log('Add new user: ');
          response.statusCode = StatusCodes.CREATED;
          data.error = ReasonPhrases.CREATED;
          data.message = 'New user added';
          break;

        case 'GET':
          console.log(id);
          console.log(`Getting A User By Id: ${id}`);
          response.statusCode = StatusCodes.OK;
          data.error = ReasonPhrases.OK;
          data.message = `Getting user by ${id}`;
          break;

        case 'PATCH':
          console.log(id);
          data.error = ReasonPhrases.OK;
          response.statusCode = StatusCodes.CREATED;
          data.message = `Editing user by ${id}`;
          console.log(`Editing A User By Id: ${id}`);
          // console.log('No id selected');
          break;

        case 'DELETE':
          console.log(id);
          data.error = ReasonPhrases.GONE;
          response.statusCode = StatusCodes.NO_CONTENT;
          console.log(`Deleting A User By Id: ${id}`);
          // console.log('No id selected');
          // }
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

      console.log(`dealing with posts - id: ${postsEndpoint.pathname.groups.id}`);

      break;
    }
  }

  response.setHeader('Content-Type', 'application/json');
  // response.statusCode = StatusCodes.OK;

  response.write(JSON.stringify(data));
  response.end();
};
