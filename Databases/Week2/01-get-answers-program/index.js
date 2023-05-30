'use strict';

const mysql = require('mysql2');
const readline = require('readline');

// Import prepared statements queries
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

// All functions
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

const main = async () => {
  console.log('Do some magic');
  const consoleOptionsMessages = [
    'Select an option: ',
    '1. What is the capital of a country?',
    '2. List all the languages spoken in a region',
    '3. Find the number of cities where a language is spoken',
    '4. List all the continents with the number of languages spoken',
    // '5. Check if any countries have the same official language or are in the same continent',
    '5. Exit',
  ];

  consoleOptionsMessages.forEach((message) => console.log(message));

  const option = await getUserInputFromConsole('Enter your choice (1-5): ');

  switch (option) {
    case '1':
      console.log('Enter a country name: ');
      showCountryCapital();
      break;
    case '2':
      console.log('Enter a region name: ');
      listAllLanguagesInRegion();
      break;
    case '3':
      console.log('Enter a language: ');
      countCitiesWhereLanguageIsSpoken();
      break;
    case '4':
      listAllContinentsWithLanguagesCount();
      break;
    case '5':
      console.log('Exiting...');
      connection.end();
      break;
    default:
      console.log('Invalid option');
      connection.end();
  }

  interactWithConsole.close();
};
