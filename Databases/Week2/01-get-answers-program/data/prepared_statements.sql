-- 1. What is the capital of country X ? (Accept X from user)
-- TODO: remove value in the and put '?'
prepare country_capital from 'select country.name , city.name from city inner join country on capital = city.id where country.name = "Germany";';
-- 2. List all the languages spoken in the region Y (Accept Y from user) 

-- 3. Find the number of cities in which language Z is spoken (Accept Z from user)
-- 4. List all the continents with the number of languages spoken in each continent
-- 5. For the country given as input, is there any countries that
  -- have the same official language
  -- is in the same continent
-- If yes, display those countries.
-- If no, display FALSE
