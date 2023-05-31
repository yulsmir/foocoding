'use strict';

// -- 1. What is the capital of country X ? (Accept X from user)
const countryCapital =
  'select city.name as capital from city inner join country on capital = city.id where country.name = ?;';

const prepareStatementCountryCapital = `prepare statement from 
  'select city.name as capital
  from city 
  inner join country
  on city.id = country.capital
  where country.name = ?';

  set @countryName = ?;
  execute statement using @countryName;
  deallocate prepare statement;
`;

// -- 2. List all the languages spoken in the region Y (Accept Y from user)
const allLanguagesInRegionList =
  'select language from countrylanguage inner join country on country.code = countrylanguage.countrycode where country.region = ? group by language;';

const prepareStatementAllLanguagesInRegionList = `prepare statement from
  'select language 
  from countrylanguage 
  inner join country 
  on country.code = countrylanguage.countrycode 
  where country.region = ? 
  group by language;'

  set @language = ?;
  execute statement using @language;
  deallocate prepare statement;
`;

// -- 3. Find the number of cities in which language Z is spoken (Accept Z from user)
const citiesWhereLanguageIsSpokenCount =
  'select count(1) as cities from city inner join countrylanguage on city.countrycode = countrylanguage.countrycode where countrylanguage.language = "Slovak";';

const preparedCitiesWhereLanguageIsSpokenCount = `prepare statement from 
  'select count(1) as cities
  from city
  inner join countrylanguage
  on city.countrycode = countrylanguage.countrycode
  where countrylanguage.language = ?;'

  set @language = ?;
  execute statement using @language;
  deallocate prepare statement;
  `;

// -- 4. List all the continents with the number of languages spoken in each continent
const allContinentsWithLanguagesCount =
  'select country.continent, count(countrylanguage.language) as languages_number from country inner join countrylanguage on country.code = countrylanguage.countrycode group by country.continent;';

const preparedAllContinentsWithLanguagesCount = `prepare statement from 
  'select country.continent, count(countrylanguage.language) as languagesNumber 
  from country 
  inner join countrylanguage 
  on country.code = countrylanguage.countrycode 
  group by country.continent;'
  
  execute statement;
  deallocate prepare statement;
  `;
// -- 5. For the country given as input, is there any countries that
// -- have the same official language
// -- is in the same continent

// -- If yes, display those countries.
// -- If no, display FALSE
