# Todo app
### Requirements
- Node.js 18.16 LTS
- MySQL 5.7
### Short description
Functions implemented:
- Insert item(s) in ToDo list
- Delete item(s) in ToDo list
- Delete a ToDo list
- Create a new ToDo list
- Mark an item as completed
- Add a reminder for the list (not for the item)

### Endpoints implemented
| Description                                 | Method | URL  pattern                                             | Local test | Deployed test|                                     
|-----------------------------------------|--------|---------------------------------------------------|-------------------------------------------|---------------------------------------------------|
| Simple homepage                         | GET    | `http://localhost:3000` or `http://localhost:3000/` | http://localhost:3000/ or http://localhost:3000/ | https://todoapptest.fly.dev or https://todoapptest.fly.dev/
| Get user's todo lists                   | GET    | `http://localhost:3000/user/:userId/lists`             | http://localhost:3000/user/1/lists | https://todoapptest.fly.dev/user/1/lists |
| Get user's todo list by ID              | GET    | `http://localhost:3000/user/:userId/lists/:listId`     | http://localhost:3000/user/1/lists/1| https://todoapptest.fly.dev/user/1/lists/1 |
| Create a todo list                      | POST   | `http://localhost:3000/user/:userId/lists`             | http://localhost:3000/user/1/lists | https://todoapptest.fly.dev/user/1/lists |               
| Delete a todo list                      | DELETE | `http://localhost:3000/user/:userId/lists/:listId`     | http://localhost:3000/user/1/lists/1  | https://todoapptest.fly.dev/user/1/lists/2 |
| Add reminder to the list                | POST   | `http://localhost:3000/user/:userId/lists/:listId/reminders` | http://localhost:3000/user/1/lists/1/reminders  | https://todoapptest.fly.dev/user/1/lists/3/reminders |
| Insert item(s) in todo list             | POST  | `http://localhost:3000/user/:userId/lists/:listId/items` | http://localhost:3000/user/1/lists/1/items | https://todoapptest.fly.dev/user/1/lists/4/items
| Get item(s) from a todo list            | GET  | `http://localhost:3000/user/:userId/lists/:listId/items` | http://localhost:3000/user/1/lists/1/items | https://todoapptest.fly.dev/user/1/lists/4/items
| Delete item(s) from todo list           | DELETE  | `http://localhost:3000/user/:userId/lists/:listId/items/:itemId` | http://localhost:3000/user/1/lists/1/items/1 | https://todoapptest.fly.dev/user/1/lists/1/items/18/ 
| Mark item as completed                  | PATCH  | `http://localhost:3000/user/:userId/lists/:listId/items/:itemId` | http://localhost:3000/user/1/lists/1/items/1 | [https://todoapptest.fly.dev/user/1/lists/items/2](https://todoapptest.fly.dev/user/1/lists/2/items)|

## Project setup
1. Clone repo
2. Navigate to ```Databases/Week3/todo-app```
3. Run ```npm install``` to install dependencies
4. Make a copy of ```.env.sample``` and rename it as ```.env```.
5. Inside ```.env```:
    - put your database user name into MYSQL_USER and
    - put your database user password into MYSQL_PASSWORD and
6. Import ```todo_app.sql``` database or just run sql queries in mysql console to create a db. 
7. Make sure your database is called ```todo_app```.
8. To start server run any of the listed commands
    - ```npm start```
    - ```node index.js```
    - ```nodemon run```
9. Open in browser ```localhost:3000``` or ```127.0.0.1:3000```

## Testing
1. Check urls from endpoints table and response results in browser devtools response for get requests.
2. Use Postman or [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) VS Code extension to check endpoints all requests implemented: 
  
 
3. Link to my [prepared postman requests](https://www.postman.com/yulsmir/workspace/my-public-env/collection/10283822-bf799acc-b067-4b49-9932-12b716e53f09?action=share&creator=10283822) for both ```localhost``` and ```fly.io``` created to test this app:
  
  Don't forget to install postman agent.
 
4. To test requests for different lists, users, items in Postman got to  ```Params => Path Variables``` and change value of tested parameter: 
    - userId - 1 or 2 (only 2 users in db now)
    - listId - 1...4;
    - itemId - 1...35.

## Deployments
- Database: https://todoapp-mysql-db.fly.dev/ (private service, available only from fly.io account)
- Database setup repo: https://github.com/yulsmir/todo-app-mysqldb-fly.io
- App: https://todoapptest.fly.dev/
