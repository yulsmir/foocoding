# CLI to Connect to a REST API

Using the code in this repository, you need to build a CLI to connect to the API that we develop in the week 1, basically you need to get answer from the user to get the desire resource (`users` or `posts`), and after that ask the user for the method (`DELETE`, `GET`, `PATCH`, `POST`); if the user choose `GET`, you need to ask if the user want a `get all` or `get by ID` (if the user choose `get by ID` you need to ask for the `ID`).

For `PATCH` AND `POST` you need to ask every single field for the selected resourse and make the request.

Example:

```bash
What resource do you want to work with?
What method do you want to work with (DELETE, GET, PATCH, POST)?
You choose GET, do you want to make a GET All or GET By ID?

You choose to make a POST request to /users
User Firstname?
User Lastname?
User Email?
User Gender?

Show a message like The new user was created sucessfully
Show the user sent by the API
or
Display the server error
```

Aditionaly, you have to implement parameter for the CLI, to choose some of the question in the moment that you run the CLI; that option have to be, the resource (`users` or `posts`), the method (`DELETE`, `GET`, `PATCH`, `POST`) and if the `GET` is by `ID` or not.

```bash
node api-cli.js --resource users --method GET --all
```

These parameters are optional.