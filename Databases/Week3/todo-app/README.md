# Todo app
### Short description
Functions implemented:
- Insert item(s) in ToDo list
- Delete item(s) in ToDo list
- Delete a ToDo list
- Create a new ToDo list
- Mark an item as completed
- Add a reminder for the list (not for the item)

### Endpoints implemented
| Description                                 | Method | URL  pattern                                             | Example to check                                     
|-----------------------------------------|--------|---------------------------------------------------|----------------------------------------------------------------------------------------------|
| Get user's todo lists                   | GET    | `http://localhost:3000/:userId/lists`             | `http://localhost:3000/1/lists` |
| Get user's todo list by ID              | GET    | `http://localhost:3000/:userId/lists/:listId`     | `http://localhost:3000/1/lists/1`|
| Create a todo list                      | POST   | `http://localhost:3000/:userId/lists`             | `http://localhost:3000/1/lists`                 
| Delete a todo list                      | DELETE | `http://localhost:3000/:userId/lists/:listId`     | `http://localhost:3000/1/lists/1`  |
| Add reminder to the list                | POST   | `http://localhost:3000/:userId/lists/:listId/reminders` | `http://localhost:3000/1/lists/1/reminders` 
| Insert item(s) in todo list             | POST  | `http://localhost:3000/:userId/lists/:listId/items` | `http://localhost:3000/1/lists/1/items`|
| Delete item(s) from todo list             | DELETE  | `http://localhost:3000/:userId/lists/:listId/items/:itemId` | `http://localhost:3000/1/lists/1/items/1`|
| Mark item as completed             | PATCH  | `http://localhost:3000/:userId/lists/:listId/items/:itemId` | `http://localhost:3000/1/lists/1/items/1`|

## Project setup
1. Clone repo
2. Navigate to ```Databases/Week3/todo-app```
3. Run ```npm install``` to install dependencies
4. Navigate to ```index.js``` and inside ```const connection``` change 
    - ```password``` to your app user password
    - ```user``` to your app user name
5. Import ```todo_app.sql``` database or just run sql queries in mysql console to create a db. 
6. Make sure your database is called ```todo_app```.
7. To start server run any of the listed commands
    - ```nodemon run```
    - ```nodemon index.js```
    - ```node index.js```
8. Open in browser ```localhost:3000``` or ```127.0.0.1:3000```

## Testing
1. Check urls from endpoints table and response results in browser devtools response for get requests.
2. Use Postman or Thunder Client VS Code extension to check endpoints all requests implemented: 
  https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client
 
3. Link to my prepared postman requests created to test this app:
  https://www.postman.com/yulsmir/workspace/my-public-env/collection/10283822-bf799acc-b067-4b49-9932-12b716e53f09?action=share&creator=10283822
  Don't forget to install postman agent.
 
4. To test requests for different lists, users, items in Postman got to  ```Params => Path Variables``` and change value of tested parameter: 
    - userId - 1 or 2 (only 2 users in db now)
    - listId - 1...4;
    - itemId - 1...4.
