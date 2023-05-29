'use strict';

const mysql = require('mysql2');
const readline = require('readline');
const {
  countryCapital,
  allLanguagesInRegionList,
  citiesWhereLanguageIsSpokenCount,
  allContinentsWithLanguagesCount,
} = require('./prepared_statements');

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
connection.connect((err) => {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
  main();
});

//TODO:  All functions
const handleQueryErrors = (query) => {};
const showCountryCapital = (query) => {};
const listAllLanguagesInRegion = (query) => {};
const countCitiesWhereLanguageIsSpoken = (query) => {};
const listAllContinentsWithLanguagesCount = (query) => {};

const getUserInputFromConsole = (question) => {
  return new Promise((resolve) => {
    interactWithConsole.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Main code
const main = () => {
  console.log('Do some magic');
  connection.query(
    'SELECT country.name, city.name FROM city INNER JOIN country ON capital = city.id WHERE country.name = "Germany";',
    function (err, results, fields) {
      if (err) {
        console.error('Error executing query:', err);
        connection.end(); // Close the connection in case of an error
        return;
      }
      console.log(results); // Log the results inside the callback
      connection.end(); // Close the connection after the query is completed
    },
  );
};
