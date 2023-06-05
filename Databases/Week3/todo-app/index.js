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
// Get user's todo list
router.get('/:userId/lists/:listId', showList);

// Create a todo list
router.post('/:userId/lists', createList);

// Delete a todo list
router.delete('/:userId/lists/:listId', deleteList);

// Add reminder for the list
router.post('/userId/lists/:listId/reminders', addListReminder);

// --- ITEMS ----
// Insert item(s) in todo list
router.post('/:userId/lists/:listId/items', addItem);

// FUNCTIONS
const showList = (req, res) => {};
const createList = (req, res) => {};
const deleteList = (req, res) => {};
const addListReminder = (req, res) => {};
const addItem = (req, res) => {};

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
