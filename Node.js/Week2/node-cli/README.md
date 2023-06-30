# Node CLI
Node http server with CRUD implemented. from week1 with CLI API.
## Requirements:
Node.js 18.16.x or greater.

### Setup
To install dependencies use: 
```npm install```
## Running the server
To run the application in production mode you can use the next command:
```npm run start```

To run the application in development mode you can use the next command:
```npm run start:dev```

Note: The application in development mode use the Node.js native watch feature to reload the application after file changes.

### CLI
To run CLI API use  ```node api-cli.js``` and follow input questions through CLI.

### CLI PARAMS
To run CLI API with parameters
USERS: 
- ```node cli-params.js --resource users --method GET --all```
- ```node cli-params.js --resource users --method GET --id```
- ```node cli-params.js --resource users --method POST```
- ```node cli-params.js --resource users --method DELETE --id```
- ```node cli-params.js --resource users --method PATCH --id```

POSTS:
- ```node cli-params.js --resource posts --method GET --all```
- ```node cli-params.js --resource posts --method GET --id```
- ```node cli-params.js --resource posts --method POST```
- ```node cli-params.js --resource posts --method DELETE --id```
- ```node cli-params.js --resource posts --method PATCH --id```
