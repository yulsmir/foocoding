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
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'todo_app',
  rowsAsArray: true,
});

const sql = 'select * from todolist';
connection.query(sql, function (err, results, fields) {
  console.log(sql);
  console.log(err);
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
});

const main = async () => {
  let userId = null;
  let listId = null;
  let itemId = null;

  // ---- LISTS ----
  // Get user's todo lists
  router.get(`/:${userId}/lists`, (req, res) => {
    userId = req.params.userId;

    // console.log('lists shown');
    // res.status(200).json({ result: 'lists' });

    const sql = 'select * from `todolist` where `user_id` = 1';
    connection.query(sql, function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    });
    // connection.prepare((error, conn) => {
    //   if (error) {
    //     console.error('Error connecting to the database:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    //     return;
    //   }

    //   conn.execute(sql, [userId], (error, results) => {
    //     conn.release();

    //     if (error) {
    //       console.error('Error retrieving lists:', error);
    //       res.status(500).json({ error: 'Internal server error' });
    //     } else {
    //       console.log('Lists fetched successfully');
    //       res.status(200).json({ result: results });
    //     }
    //   });
    // });
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
