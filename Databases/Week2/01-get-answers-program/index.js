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
// Helper function to handle error
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

// Helper function to execute query with promises
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

// 1. What is the capital of country X ? (Accept X from user)
const showCountryCapital = async () => {
  const countryName = await getUserInput('Enter a country name: ');
  const prepareStatement =
    "prepare statement from 'select city.name as capital from city inner join country on city.id = country.capital where country.name = ?';";
  const assignVariable = 'set @countryName = ?;';
  const executeStatement = 'execute statement using @countryName;';
  const deallocateStatement = 'deallocate prepare statement;';

  try {
    await executeQuery(prepareStatement);
    await executeQuery(assignVariable, [countryName]);
    const results = await executeQuery(executeStatement);

    if (results.length > 0) {
      const capital = results[0].capital;
      console.log(`Capital of ${countryName} is ${capital}`);
    } else {
      console.log(`No results found for ${countryName}`);
    }
    await executeQuery(deallocateStatement);
  } catch (err) {
    handleQueryErrors(err);
  }
};

// Answer question
// 2. List all the languages spoken in the region Y(Accept Y from user)
const listAllLanguagesInRegion = async () => {
  const regionName = await getUserInput('Enter a region name: ');
  const prepareStatement =
    "prepare statement from 'select language from countrylanguage inner join country on country.code = countrylanguage.countrycode where country.region = ? group by language;'";
  const assignVariable = 'set @regionName = ?;';
  const executeStatement = 'execute statement using @regionName;';
  const deallocateStatement = 'deallocate prepare statement;';

  try {
    await executeQuery(prepareStatement);
    await executeQuery(assignVariable, [regionName]);
    const results = await executeQuery(executeStatement);

    if (results.length > 0) {
      console.log(`Languages spoken in ${regionName}:`);
      results.forEach((row) => {
        console.log(row.language);
      });
    } else {
      console.log(`No results found for ${regionName}`);
    }
    await executeQuery(deallocateStatement);
  } catch (err) {
    handleQueryErrors(err);
  }
};

// Answer question
// 3. Find the number of cities in which language Z is spoken (Accept Z from user)
const showCitiesWhereLanguageIsSpokenCount = async () => {
  const language = await getUserInput('Enter a language: ');
  const prepareStatement =
    "prepare statement from 'select count(1) as cities from city inner join countrylanguage on city.countrycode = countrylanguage.countrycode where countrylanguage.language = ?;'";
  const assignVariable = 'set @language = ?;';
  const executeStatement = 'execute statement using @language;';
  const deallocateStatement = 'deallocate prepare statement;';

  try {
    await executeQuery(prepareStatement);
    await executeQuery(assignVariable, [language]);
    const results = await executeQuery(executeStatement);

    if (results.length > 0) {
      const citiesCount = results[0].cities;
      console.log(`Number of cities where ${language} is spoken: ${citiesCount}`);
    } else {
      console.log(`No results found for ${language}`);
    }
    await executeQuery(deallocateStatement);
  } catch (err) {
    handleQueryErrors(err);
  }
};

// Answer question
// 4. List all the continents with the number of languages spoken in each continent
const listAllContinentsWithLanguagesCount = async () => {
  // const query = `select country.continent, count(countrylanguage.language) as languages_number from country inner join countrylanguage on country.code = countrylanguage.countrycode group by country.continent;`;
  const prepareStatement =
    "prepare statement from 'select country.continent, count(countrylanguage.language) as languagesNumber from country inner join countrylanguage on country.code = countrylanguage.countrycode group by country.continent;'";
  const executeStatement = 'execute statement;';
  const deallocateStatement = 'deallocate prepare statement;';

  try {
    await executeQuery(prepareStatement);
    const results = await executeQuery(executeStatement);

    if (results.length > 0) {
      console.log('Continents with the number of languages spoken: ');
      results.forEach((row) => {
        console.log(`${row.continent}: ${row.languagesNumber}`);
      });
    } else {
      console.log('No results found.');
    }
    await executeQuery(deallocateStatement);
  } catch (err) {
    handleQueryErrors(err);
  }
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
      connection.end();
      userInput.close();
      break;
    case '2':
      await listAllLanguagesInRegion();
      connection.end();
      userInput.close();
      break;
    case '3':
      await showCitiesWhereLanguageIsSpokenCount();
      connection.end();
      userInput.close();
      break;
    case '4':
      await listAllContinentsWithLanguagesCount();
      connection.end();
      userInput.close();
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

// Simple main
// const main = () => {
//   console.log('Do some magic');
//   connection.query(
//     'select country.name, city.name from city inner join country on capital = city.id where country.name = "Germany";',
//     function (err, results, fields) {
//       if (err) {
//         console.error('Error executing query:', err);
//         connection.end();
//         return;
//       }
//       console.log(results);
//       connection.end();
//     },
//   );
// };
