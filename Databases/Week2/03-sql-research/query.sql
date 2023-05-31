-- I want to get alerts when a country has >= 10 languages. E.g. If a country X has 9 languages in the CountryLanguage table, and a user INSERTs one more row in the CountryLanguage table, then I should get an alert.
-- How can I achieve this ?

--     Write the necessary SQL statements for this solution and
--     Test your solution with example insert statements.

delimiter //
create trigger limit_laguages_to_10 after insert on countrylanguage
for each row
begin
  if(select count(1) from countrylanguage where countrycode = new.countrycode) >= 9 then
    signal sqlstate '45000' set message_text = 'Country has 10 or more languages';
  end if;

end //

delimiter ;

-- Test query for Canada
insert into countrylanguage (countrycode, language, isofficial, percentage)
values ('CAN', 'Some language', 'T', 34.0);

-- Test query for Vietnam
insert into countrylanguage (countrycode, language, isofficial, percentage)
values ('VNM', 'Some language', 'F', 22.0);