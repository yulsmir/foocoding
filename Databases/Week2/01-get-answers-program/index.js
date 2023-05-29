const mysql = require('mysql2');
const readline = require('readline');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'new_world',
});

// Setup user input with readline module
// const interactWithConsole = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const getUserInputFromConsole = (question) => {
//   return new Promise((resolve) => {
//     interactWithConsole.question(question, (answer) => {
//       resolve(answer);
//     });
//   });
// };

// Estabish connection with MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected');
});
