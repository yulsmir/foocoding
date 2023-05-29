-- 1. What is the capital of country X ? (Accept X from user)
-- TODO: remove value Germany in the query and put '?'
prepare country_capital from 'select country.name , city.name from city inner join country on capital = city.id where country.name = "Germany";';

-- TODO: remove value Caribbean in the query and put '?'
-- 2. List all the languages spoken in the region Y (Accept Y from user) 
prepare region_laguage from 'select language from countrylanguage inner join country on country.code = countrylanguage.countrycode where country.region = "Caribbean" group by language;';

-- TODO: remove value Slovak in the query and put '?'
-- 3. Find the number of cities in which language Z is spoken (Accept Z from user)
prepare count_cities_with_language from 'select count(1) from city inner join countrylanguage on city.countrycode = countrylanguage.countrycode where countrylanguage.language = "Slovak";';

-- TODO: remove value in the query and put '?'
-- 4. List all the continents with the number of languages spoken in each continent

-- TODO: remove value in the query and put '?'
-- 5. For the country given as input, is there any countries that
  -- have the same official language
  -- is in the same continent

  -- If yes, display those countries.
  -- If no, display FALSE
