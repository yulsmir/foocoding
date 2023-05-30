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
const handleQueryErrors = (err, results) => {
  const errorMessage = 'Error executing query: ';
  if (err) {
    console.error(errorMessage, err);
    connection.end(); // Close the connection in case of an error
    return;
  }
  console.log(results); // Log the results inside the callback
  connection.end(); // Close the connection after the query is completed
};

const showCountryCapital = () => {
  connection.query(countryCapital, function (err, results, fields) {
    handleQueryErrors(err, results);
  });
};

const listAllLanguagesInRegion = () => {
  connection.query(allLanguagesInRegionList, function (err, results, fields) {
    handleQueryErrors(err, results);
  });
};

const countCitiesWhereLanguageIsSpoken = () => {
  connection.query(citiesWhereLanguageIsSpokenCount, function (err, results, fields) {
    handleQueryErrors(err, results);
  });
};

const listAllContinentsWithLanguagesCount = () => {
  connection.query(allContinentsWithLanguagesCount, function (err, results, fields) {
    handleQueryErrors(err, results);
  });
};

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
  // TODO: one query at a time is allowed
  showCountryCapital();
  // listAllLanguagesInRegion();
  // countCitiesWhereLanguageIsSpoken();
  // listAllContinentsWithLanguagesCount();
};
