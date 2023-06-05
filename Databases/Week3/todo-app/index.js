'use strict';

const express = require('express');
const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'todo_app',
});

// Define routes
const router = express.Router();

// FUNCTIONS
const showList = (req, res) => {
  console.log('list shown');
};

const createList = (req, res) => {
  console.log('List is created');
};

const deleteList = (req, res) => {
  console.log('List is deleted');
};

const addListReminder = (req, res) => {
  console.log('Reminder is added');
};

const addItem = (req, res) => {
  console.log('Item is added to a list');
};

const userId = 1;
const listId = 1;

// ---- LISTS ----
// Get user's todo list
router.get(`/:user${userId}/lists/${listId}`, showList);

// Create a todo list
router.post(`/:user${userId}/lists`, createList);

// Delete a todo list
router.delete(`/:user${userId}/lists/:${listId}`, deleteList);

// Add reminder for the list
router.post(`/:user${userId}/lists/:${listId}/reminders`, addListReminder);

// --- ITEMS ----
// Insert item(s) in todo list
router.post(`/:user${userId}/lists/:${listId}/items`, addItem);

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use('/', router);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
