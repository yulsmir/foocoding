'use strict';

import http from 'node:http';
import { URLPattern } from 'urlpattern-polyfill';
import { requestHandler } from './src/utils/index.js';

const HOST = process.env.HOST ?? '127.0.0.1';
const PORT = process.env.PORT ?? 3000;

const server = http.createServer(requestHandler);

server.listen(PORT, HOST, () => {
  const { address, port } = server.address();
  const serverUrl = `http://${address}:${port}/`;

  console.log('Server running at: %s', serverUrl);
});
