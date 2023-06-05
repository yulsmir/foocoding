# todo-express-api
Todo api with express module

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
| Insert item(s) in todo list             | PATCH  | `http://localhost:3000/:userId/lists/:listId/items` | `http://localhost:3000/1/lists/1/items`        

## Project setup
1. Clone repo
2. Run ```npm install``` to install dependencies
3. Run ```nodemon run``` or ```nodemon index.js```to start server
4. Open in browser ```localhost:3000``` or ```127.0.0.1:3000```
5. Check urls from endpoints implemented and response results in dev tools:
6. Make sure to replace ```:userId`` with value 1 or 2, so you can see lists of separate users.


