'use strict';

// Password secure usage
require('dotenv').config();

const express = require('express');
const port = 3000;
const app = express();

// Define routes
const router = express.Router();
const mysql = require('mysql2');

// Create a MySQL connection pool
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'todo_app',
  rowsAsArray: true,
});

const main = async () => {
  let userId = null;
  let listId = null;
  let itemId = null;

  // ---- LISTS ----
  // Get user's todo lists
  router.get(`/:userId/lists`, (req, res) => {
    userId = req.params.userId;

    // console.log('lists shown');
    // res.status(200).json({ result: 'lists' });

    const sql = 'select id, name from `todolist` where `user_id` = ?';

    connection.query(sql, [userId], (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({ lists: results });
      }
    });
  });

  // Get user's todo list
  router.get(`/:${userId}/lists/:${listId}`, (req, res) => {
    userId = req.params.userId;
    listId = req.params.listId;

    console.log('list shown');
    res.status(200).json({ result: 'list' });
  });

  // Create a todo list
  router.post(`/:${userId}/lists`, (req, res) => {
    userId = req.params.userId;

    console.log('List is created');
    res.status(200).json({ result: 'new list is created' });
  });

  // Delete a todo list
  router.delete(`/:${userId}/lists/:${listId}`, (req, res) => {
    userId = req.params.userId;

    console.log('List is deleted');
    res.status(201).json({ result: 'list is deleted' });
  });

  // Add reminder to the list
  router.post(`/:${userId}/lists/:${listId}/reminders`, (req, res) => {
    userId = req.params.userId;
    listId = req.params.listId;

    console.log('Reminder is added');
    res.status(201).json({ result: 'Reminder is added to the list' });
  });

  // --- ITEMS ----
  // Insert item(s) in todo list
  router.post(`/:${userId}/lists/:${listId}/items`, (req, res) => {
    userId = req.params.userId;
    listId = req.params.listId;

    console.log('Item is added to the list');
    res.status(201).json({ result: 'Item is added to the list' });
  });

  // Add reminder to the item
  router.post(`/:${userId}/lists/:${listId}/items/:${itemId}/reminders`, (req, res) => {
    userId = req.params.userId;
    listId = req.params.listId;
    itemId = req.params.itemId;

    console.log('Reminder is added');
    res.status(201).json({ result: 'Reminder is added to the item' });
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
