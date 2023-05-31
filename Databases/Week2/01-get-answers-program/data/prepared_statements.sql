-- 1. What is the capital of country X ? (Accept X from user)
prepare statement from 
'select city.name as capital
from city 
inner join country
on city.id = country.capital
where country.name = ?';

set @countryName = ?;
execute statement using @countryName;
deallocate prepare statement;

-- 2. List all the languages spoken in the region Y (Accept Y from user) 
prepare statement from
'select language 
from countrylanguage 
inner join country 
on country.code = countrylanguage.countrycode 
where country.region = ? 
group by language;'

set @language = ?;
execute statement using @language;
deallocate prepare statement;

-- 3. Find the number of cities in which language Z is spoken (Accept Z from user)
prepare statement from 
'select count(1) as cities
from city
inner join countrylanguage
on city.countrycode = countrylanguage.countrycode
where countrylanguage.language = ?;'

set @language = ?;
execute statement using @language;
deallocate prepare statement;

-- 4. List all the continents with the number of languages spoken in each continent
prepare statement from 
'select country.continent, count(countrylanguage.language) as languagesNumber 
from country 
inner join countrylanguage 
on country.code = countrylanguage.countrycode 
group by country.continent;'

execute statement;
deallocate prepare statement;

-- 5. For the country given as input, is there any countries that
  -- have the same official language
  -- is in the same continent

  -- If yes, display those countries.
  -- If no, display FALSE

-- v1 with empty set if no countries fit
select c2.name as country
from country as c1
join country as c2 on c1.code != c2.code
join countrylanguage as cl1 on c1.code = cl1.countrycode
join countrylanguage as cl2 on c2.code = cl2.countrycode
where c1.name = 'Denmark'
  and cl1.isofficial = 'T'
  and cl2.isofficial = 'T'
  and cl1.language = cl2.language
  and c1.continent = c2.continent;

-- Prepared statement
prepare statement from
'select c2.name as country
from country as c1
join country as c2 on c1.code != c2.code
join countrylanguage as cl1 on c1.code = cl1.countrycode
join countrylanguage as cl2 on c2.code = cl2.countrycode
where c1.name = ?
  and cl1.isofficial = 'T'
  and cl2.isofficial = 'T'
  and cl1.language = cl2.language
  and c1.continent = c2.continent;'

set @country = ?;
execute statement using @country;
deallocate prepare statement;
-- v2 with FALSE if no countries fit
-- TODO: fix
-- select ifnull(
--   (
--     select c2.name as country
--     from country as c1
--     join country as c2 on c1.code != c2.code
--     join countrylanguage as cl1 on c1.code = cl1.countrycode
--     join countrylanguage as cl2 on c2.code = cl2.countrycode
--     where c1.name = 'United States'
--       and cl1.isofficial = 't'
--       and cl2.isofficial = 't'
--       and cl1.language = cl2.language
--       and c1.continent = c2.continent
--   ),
--   'FALSE'
-- ) as countries;
