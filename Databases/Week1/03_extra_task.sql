-- Extra task:
-- 1. What are the names of the countries that has more than 10 cities, and a total 
-- population of the cities listed (not the country population) of more than 50 million?
select country.name, sum(city.population) as total_city_population
from country
inner join city on country.code = city.countrycode
group by country.name
having count(city.name) > 10 and sum(city.population) > 50000000
order by total_city_population ASC;

-- 2. List the cities from those countries, where the city population is > 5M
select city.name, city.population
from city
where countrycode in (
  select country.code
  from country
  inner join city on country.code = city.countrycode
  group by country.code
  having count(city.name) > 10 and sum(city.population) > 50000000
)
and city.population > 5000000
order by population ASC;
