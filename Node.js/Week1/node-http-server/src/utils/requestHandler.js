'use strict';

import { ReasonPhrases, StatusCodes } from 'http-status-codes';

// import { getRequestData } from './getRequestData.js';
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
            id: 123456789,
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
                response.end(JSON.stringify(userToUpDate));
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
          if (id) {
            // TODO: add filter or slice of users without id
            response.statusCode = StatusCodes.OK;
            response.setHeader('Content-Type', 'application/json');
            data.message = `User with id ${id} was successfully deleted`;
            response.end(JSON.stringify({ data }));
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
      const id = postsPattern?.pathname?.groups?.id;
      const postsData = await readJsonFile('./data/posts.json');
      const posts = JSON.parse(postsData);
      const post = posts.find((post) => post.id === parseInt(id));

      // console.log(`dealing with posts - id: ${postsEndpoint.pathname.groups.id}`);

      switch (method) {
        case 'POST':
          const newPost = {
            post_id: 1234567,
            user_id: 2,
            post_text: 'Test test test test',
            post_date: '2/6/2021',
            likes: 1111,
            comments: 1111,
            hashtags: '#followme',
            location: 'Fanhu',
            post_image: 'https://robohash.org/rerumautea.png?size=50x50&set=set1',
          };

          posts.push(newPost);
          response.setHeader('Content-Type', 'application/json');

          try {
            await writeJsonFile('./data/posts.json', posts);
            response.statusCode = StatusCodes.CREATED;
            response.end(JSON.stringify({ posts: newPost }));
          } catch (err) {
            response.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
            response.end(JSON.stringify({ error: 'Failed to add new user' }));
          }
          break;

        case 'GET':
          if (id) {
            response.statusCode = StatusCodes.OK;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(post));
          } else {
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

  // response.statusCode = StatusCodes.OK;

  // response.write(JSON.stringify(data));
  // response.end();
};
