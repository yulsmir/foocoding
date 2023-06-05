'use strict';

const express = require('express');
const mysql = require('mysql2');
const port = 3000;
const app = express();

// Define routes
const router = express.Router();

// Create a MySQL connection pool
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'todo_app',
});

const executeQuery = (userRequest, mySqlRequest, callback) => {
  const request = prompt(userRequest);

  connection.prepare(mySqlRequest, (err, statement) => {
    console.log(statement);
    statement.execute([request], callback);
    statement.close();
  });
};

const handleError = (err, results) => {
  if (results) {
    console.log(results);
  } else {
    console.log('An error occurred:', err);
  }
};

const main = async () => {
  const userId = 1;
  const listId = 1;

  // ---- LISTS ----
  // Get user's todo lists
  router.get(`/:user${userId}/lists`, (req, res) => {
    console.log('lists shown');
    res.status(200).json({ result: 'lists' });
  });

  // Get user's todo list
  router.get(`/:user${userId}/lists/:${listId}`, (req, res) => {
    console.log('list shown');
    res.status(200).json({ result: 'list' });
  });

  // Create a todo list
  router.post(`/:user${userId}/lists`, (req, res) => {
    console.log('List is created');
    res.status(200).json({ result: 'lists with new list' });
  });

  // Delete a todo list
  router.delete(`/:user${userId}/lists/:${listId}`, (req, res) => {
    console.log('List is deleted');
    res.status(201).json({ result: 'list' });
  });

  // Add reminder for the list
  router.post(`/:user${userId}/lists/:${listId}/reminders`, (req, res) => {
    console.log('Reminder is added');
  });

  // --- ITEMS ----
  // Insert item(s) in todo list
  router.patch(`/:user${userId}/lists/:${listId}/items`, (req, res) => {
    console.log('Item is added to the list');
  });

  // Middleware
  app.use(express.json());
  app.use('/', router);

  // Start the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

main();
