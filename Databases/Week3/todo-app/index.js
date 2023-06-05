'use strict';

const express = require('express');
const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'todo_app',
  connectionLimit: 2, // 2 users
});

// Define routes
const router = express.Router();

// ---- LISTS ----
// Get user's todolist
router.get('/:userId/lists/:listId', showList);

// Create a todolist
router.post('/:userId/lists', createList);

// Delete a todolist
router.delete('/:userId/lists/:listId', deleteList);

// Add reminder for the list
router.post('/userId/lists/:listId/reminders', addReminder);

// --- ITEMS ----
// Insert item(s) in todo list
router.post('/:userId/lists/:listId/items', addItem);

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
