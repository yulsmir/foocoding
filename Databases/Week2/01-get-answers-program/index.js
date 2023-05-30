'use strict';

require('dotenv').config();

const mysql = require('mysql2');
const readline = require('readline');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // Replace password with your root password or
  // create file .env in root of 01-get-answers-program
  // and add DB_PASSWORD=your_root_password_value
  password: process.env.DB_PASSWORD,
  database: 'new_world',
});

const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Establish connection with MySQL
connection.connect((err) => {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
  main();
});

const getUserInput = (question) => {
  return new Promise((resolve) => {
    userInput.question(question, (answer) => {
      resolve(answer);
    });
  });
};

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

const showCountryCapital = async () => {
  const countryName = await getUserInput('Enter a country name: ');
  const prepareStatement =
    "prepare statement from 'select city.name as capital from city inner join country on city.id = country.capital where country.name = ?';";
  const assignVariable = 'set @countryName = ?;';
  const executeStatement = 'execute statement using @countryname;';
  const deallocateStatement = 'deallocate PREPARE statement;';

  connection.query(prepareStatement, (err) => {
    if (err) {
      handleQueryErrors(err);
      return;
    }

    connection.query(assignVariable, [countryName], (err) => {
      if (err) {
        handleQueryErrors(err);
        return;
      }

      connection.query(executeStatement, (err, results) => {
        if (err) {
          handleQueryErrors(err);
          return;
        }

        if (results.length > 0) {
          const capital = results[0].capital;
          console.log(`Capital of ${countryName} is ${capital}`);
        } else {
          console.log(`No results found for ${countryName}`);
        }

        connection.query(deallocateStatement, (err) => {
          if (err) {
            handleQueryErrors(err);
          }
        });
      });
    });
  });
};

const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const listAllLanguagesInRegion = async () => {
  const regionName = await getUserInput('Enter a region name: ');
  const query = `select language from countrylanguage inner join country on country.code = countrylanguage.countrycode where country.region = ? group by language;`;
  connection.query(query, [regionName], (err, results) => {
    if (err) {
      handleQueryErrors(err);
    } else if (results.length > 0) {
      console.log(`Languages spoken in ${regionName}:`);
      results.forEach((row) => {
        console.log(row.language);
      });
    } else {
      console.log(`No results found for ${regionName}`);
    }
  });
};

const showCitiesWhereLanguageIsSpokenCount = async () => {
  const language = await getUserInput('Enter a language: ');
  const query = `select count(1) as cities from city inner join countrylanguage on city.countrycode = countrylanguage.countrycode where countrylanguage.language = ?;`;
  connection.query(query, [language], (err, results) => {
    if (err) {
      handleQueryErrors(err);
    } else if (results.length > 0) {
      const citiesCount = results[0].cities;
      console.log(`Number of cities where ${language} is spoken: ${citiesCount}`);
    } else {
      console.log(`No results found for ${language}`);
    }
  });
};

const listAllContinentsWithLanguagesCount = () => {
  const query = `select country.continent, count(countrylanguage.language) as languages_number from country inner join countrylanguage on country.code = countrylanguage.countrycode group by country.continent;`;
  connection.query(query, (err, results) => {
    if (err) {
      handleQueryErrors(err);
    } else if (results.length > 0) {
      console.log('Continents with the number of languages spoken:');
      results.forEach((row) => {
        console.log(`${row.continent}: ${row.languages_number}`);
      });
    } else {
      console.log('No results found.');
    }
  });
};

// Main program
const main = async () => {
  console.log('Do some magic');
  const consoleOptionsMessages = [
    'Select an option: ',
    '1. What is the capital of a country?',
    '2. List all the languages spoken in a region',
    '3. Find the number of cities where a language is spoken',
    '4. List all the continents with the number of languages spoken',
    '5. Exit',
  ];

  consoleOptionsMessages.forEach((message) => console.log(message));

  const option = await getUserInput('Enter your choice (1-5): ');

  switch (option) {
    case '1':
      await showCountryCapital();
      break;
    case '2':
      await listAllLanguagesInRegion();
      break;
    case '3':
      await showCitiesWhereLanguageIsSpokenCount();
      break;
    case '4':
      listAllContinentsWithLanguagesCount();
      break;
    case '5':
      console.log('Exiting...');
      connection.end();
      userInput.close();
      break;
    default:
      console.log('Invalid option');
      connection.end();
      userInput.close();
  }
};
