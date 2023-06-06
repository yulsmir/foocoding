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
  password: process.env.DB_PASSWORD, // Insert your mysql root pwd here
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

    const sql = 'select id, name from todolist where user_id = ?';

    connection.query(sql, [userId], (err, results) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({ userId: userId, lists: results });
      }
    });
  });

  // Get user's todo list by id
  router.get(`/:userId/lists/:listId`, (req, res) => {
    userId = req.params.userId;
    listId = req.params.listId;

    const sql = 'select id, name from todolist where user_id = ? and id = ?';

    connection.query(sql, [userId, listId], (err, results) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({ userId: userId, listId: listId, results });
      }
    });
  });

  // Create a todo list
  router.post(`/:userId/lists`, (req, res) => {
    userId = req.params.userId;

    const sql = `insert into todolist (name, user_id) values('Newly created list to todo', ?)`;

    connection.query(sql, [userId], (err, results) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({ userId: userId, listId: listId, results });
      }
    });
  });

  // Delete a todo list by id
  router.delete(`/:userId/lists/:listId`, (req, res) => {
    userId = req.params.userId;
    listId = req.params.listId;

    const sql = `delete from todolist where user_id = ? and id = ?`;

    connection.query(sql, [userId, listId], (err, results) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({
          userId: userId,
          listId: listId,
          results: `List with id ${listId} is deleted successfully`,
        });
      }
    });
  });

  // Add reminder to the list
  // TODO: add check if reminder exists or overwrite it
  router.post(`/:userId/lists/:listId/reminders`, (req, res) => {
    userId = req.params.userId;
    listId = req.params.listId;

    const sql = `insert into listreminders (remind_at, list_id) values('2024-11-12 22:10:00', ?)`;

    connection.query(sql, [listId], (err, results) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({
          userId: userId,
          listId: listId,
          results: `Reminder for list ${listId} is added successfully`,
        });
      }
    });
  });

  // ---- ITEMS ----
  // Insert item(s) in todo list
  router.post(`/:userId/lists/:listId/items`, (req, res) => {
    userId = req.params.userId;
    listId = req.params.listId;

    const sql = `insert into todoitem (name, list_id, completed) values('Buy something new', ?, 0)`;

    connection.query(sql, [listId], (err, results) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({
          userId: userId,
          listId: listId,
          results: `Todoitem into list ${listId} is added successfully`,
        });
      }
    });
  });

  // Delete item(s) from todo list
  // TODO: fix foreign key
  router.delete(`/:userId/lists/:/items/:itemId`, (req, res) => {
    itemId = req.params.itemId;
    listId = req.params.listId;

    const sql = `delete from todoitem where id = ? and list_id = ?`;

    connection.query(sql, [itemId, listId], (err, results) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({
          userId: userId,
          listId: listId,
          results: `Item with id ${itemId} is deleted successfully`,
        });
      }
    });
  });

  // TODO: Mark item as completed
  router.patch(`/:userId/lists/:listId/items/:itemId`, (req, res) => {
    userId = req.params.userId;
    listId = req.params.listId;
    itemId = req.params.itemId;

    res.status(201).json({ result: 'Item is marked as completed' });
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
