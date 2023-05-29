const mysql = require('mysql2/promise');
const readline = require('readline');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'new_world',
});

const interactWithConsole = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getUserInput = (question) => {
  return new Promise((resolve) => {
    interactWithConsole.question(question, (answer) => {
      resolve(answer);
    });
  });
};
