'use strict';

// Password secure usage
require('dotenv').config();

const express = require('express');
const port = 3000;
const app = express();
const mysql = require('mysql2');

// Create a MySQL connection pool
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'todo_app',
  rowsAsArray: true,
});

const main = async () => {
  let userId;
  let listId;
  let itemId;

  // ---- LISTS ----
  // Get user's todo lists
  app.get(`/:userId/lists`, (req, res) => {
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
  app.get(`/:userId/lists/:listId`, (req, res) => {
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
  app.post(`/:userId/lists`, (req, res) => {
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
  app.delete(`/:userId/lists/:listId`, (req, res) => {
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
  app.post(`/:userId/lists/:listId/reminders`, (req, res) => {
    listId = req.params.listId;

    const sql = `insert into listreminders (remind_at, list_id) values('2024-11-12 22:10:00', ?)`;

    connection.query(sql, [listId], (err, results) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({
          listId: listId,
          results: `Reminder for list ${listId} is added successfully`,
        });
      }
    });
  });

  // ---- ITEMS ----
  // Insert item(s) in todo list
  app.post(`/:userId/lists/:listId/items`, (req, res) => {
    userId = req.params.userId;
    listId = req.params.listId;

    const sql = `insert into todoitem (name, list_id, completed) values('Buy something new', ?, 0)`;

    connection.query(sql, [listId], (err, results) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({
          listId: listId,
          results: `Todoitem into list ${listId} is added successfully`,
        });
      }
    });
  });

  // Delete item(s) from todo list
  app.delete(`/:userId/lists/:listId/items/:itemId`, (req, res) => {
    itemId = req.params.itemId;
    listId = req.params.listId;

    const sql = `delete from todoitem where id = ? and list_id = ?`;

    connection.query(sql, [itemId, listId], (err, results) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({
          listId: listId,
          results: `Item with id ${itemId} is deleted successfully`,
        });
      }
    });
  });

  //Mark item as completed
  app.patch(`/:userId/lists/:listId/items/:itemId`, (req, res) => {
    listId = req.params.listId;
    itemId = req.params.itemId;

    const sql = `insert into todoitem(completed) values(true) where id = ? and list_id = ?`;
    connection.query(sql, [itemId, listId], (err, results) => {
      if (err) {
        res.status(404).json({ error: err });
      } else {
        res.status(200).json({
          listId: listId,
          results: `Item with id ${itemId} is marked completed`,
        });
      }
    });
  });

  // Middleware
  app.use(express.json());

  // Start the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

main();
