const mysql = require('mysql2');
const readline = require('readline');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'new_world',
});

// Setup user input with readline module
const interactWithConsole = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Estabish connection with MySQL
connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
  main();
});

// Main code
const main = () => {
  console.log('Do some magic');
};

const getUserInputFromConsole = (question) => {
  return new Promise((resolve) => {
    interactWithConsole.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Finish connection in the end
connection.end(function (err) {
  if (err) {
    return console.log('error:' + err.message);
  }
  console.log('Close the database connection.');
});
