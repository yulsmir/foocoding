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
| Insert item(s) in todo list             | POST  | `http://localhost:3000/:userId/lists/:listId/items` | `http://localhost:3000/1/lists/1/items`        
| Add reminder to the item                | POST   | `http://localhost:3000/:userId/lists/:listId/items/:itemId/reminders` | `http://localhost:3000/1/lists/1/items/1/reminders` 
## Project setup
1. Clone repo
2. Navigate to ```Databases/Week3/todo-app```
3. Run ```npm install``` to install dependencies
4. Run ```nodemon run``` or ```nodemon index.js```to start server
5. Open in browser ```localhost:3000``` or ```127.0.0.1:3000```
6. Check urls from endpoints implemented and response results in dev tools:
7. Make sure to replace ```:userId`` with value 1 or 2, so you can see lists of 2 separate users.
8. Link to my postman requests to test app: https://www.postman.com/yulsmir/workspace/my-public-env/collection/10283822-bf799acc-b067-4b49-9932-12b716e53f09?action=share&creator=10283822


