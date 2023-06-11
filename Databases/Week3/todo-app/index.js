'use strict';

require('dotenv').config();
const express = require('express');
const port = 3000;
const app = express();
const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  rowsAsArray: true,
});

// Prepare the connection
async function prepareConnection() {
  const connection = await pool.getConnection();
  return connection;
}

// Execute a prepared statement
async function executeStatement(connection, statement, params) {
  const preparedStatement = await connection.prepare(statement);
  const [results] = await preparedStatement.execute(params);
  return results;
}

// Unprepare the connection
async function unprepareConnection(connection) {
  connection.release();
}

// Handle errors
function handleError(res, error) {
  res.status(404).json({ error: error });
}

// Get data from the database
async function getData(res, statement, params) {
  const connection = await prepareConnection();
  try {
    const results = await executeStatement(connection, statement, params);
    return results;
  } catch (error) {
    handleError(res, error);
  } finally {
    await unprepareConnection(connection);
  }
}

// ---- LISTS ----
// Homepage
app.get('/', (req, res) => {
  res.send('<h1>todoapp</h1>');
});

// Get user's todo lists
app.get('/:userId/lists', async (req, res) => {
  const userId = req.params.userId;
  const statement = 'SELECT id, name FROM todolist WHERE user_id = ?';

  const results = await getData(res, statement, [userId]);
  res.status(200).json({ userId: userId, lists: results });
});

// Get user's todo list by id
app.get('/:userId/lists/:listId', async (req, res) => {
  const userId = req.params.userId;
  const listId = req.params.listId;
  const statement = 'SELECT id, name FROM todolist WHERE user_id = ? AND id = ?';

  const results = await getData(res, statement, [userId, listId]);
  res.status(200).json({ userId: userId, listId: listId, results });
});

// Create a todo list
app.post('/:userId/lists', async (req, res) => {
  const userId = req.params.userId;
  const statement = `INSERT INTO todolist (name, user_id) VALUES ('Newly created list to todo', ?)`;

  const results = await getData(res, statement, [userId]);
  const listId = results.insertId;
  res.status(201).json({ userId: userId, listId: listId, results });
});

// Delete a todo list by id
app.delete('/:userId/lists/:listId', async (req, res) => {
  const userId = req.params.userId;
  const listId = req.params.listId;
  const statement = `DELETE FROM todolist WHERE user_id = ? AND id = ?`;

  await getData(res, statement, [userId, listId]);
  res.status(204).json({
    userId: userId,
    listId: listId,
    results: `List with id ${listId} is deleted successfully`,
  });
});

// Add reminder to the list
app.post('/:userId/lists/:listId/reminders', async (req, res) => {
  const listId = req.params.listId;
  const statement = `INSERT INTO listreminders (remind_at, list_id) VALUES ('2024-11-12 22:10:00', ?)`;

  await getData(res, statement, [listId]);
  res.status(201).json({
    listId: listId,
    results: `Reminder for list ${listId} is added successfully`,
  });
});

// ---- ITEMS ----
// Insert item(s) in todo list
app.post('/:userId/lists/:listId/items', async (req, res) => {
  const listId = req.params.listId;
  const statement = `INSERT INTO todoitem (name, list_id, completed) VALUES ('Buy something new', ?, 0)`;

  await getData(res, statement, [listId]);
  res.status(201).json({
    listId: listId,
    results: `Todoitem into list ${listId} is added successfully`,
  });
});

// Delete item(s) from todo list
app.delete('/:userId/lists/:listId/items/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const listId = req.params.listId;
  const statement = `DELETE FROM todoitem WHERE id = ? AND list_id = ?`;

  await getData(res, statement, [itemId, listId]);
  res.status(204).json({
    listId: listId,
    results: `Item with id ${itemId} is deleted successfully`,
  });
});

// Mark item as completed
app.patch('/:userId/lists/:listId/items/:itemId', async (req, res) => {
  const listId = req.params.listId;
  const itemId = req.params.itemId;
  const statement = `UPDATE todoitem SET completed = true WHERE id = ? AND list_id = ?`;

  await getData(res, statement, [itemId, listId]);
  res.status(201).json({
    listId: listId,
    results: `Item with id ${itemId} is marked completed`,
  });
});

// Middleware
app.use(express.json());
app.use((err, req, res) => {
  res.status(500).json('Some error');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
