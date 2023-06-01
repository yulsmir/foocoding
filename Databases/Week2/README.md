### Description

### Part 1. Get answers program
A Node.js program that gets answers of following queries on the new_world database, it gets the input from user and uses prepared statements.

Questions handled:
1. What is the capital of country X ? (Accept X from user)
2. List all the languages spoken in the region Y (Accept Y from user)
3. Find the number of cities in which language Z is spoken (Accept Z from user)
4. List all the continents with the number of languages spoken in each continent
5. For the country given as input, is there any countries that have the same official language is in the same continent
- If yes, display those countries.
- If no, display FALSE


### Setup
1. Clone current repo.
2. Go to ```Databases/Week2/01-get-answers-program```.
3. Inside ```index.js ``` file replace password with your mysql root password 
  OR 
  create file ```.env``` in root of ```01-get-answers-program``` and add `DB_PASSWORD=your_root_password` value.
4. Run ```npm install``` in terminal.
5. Run  ```node index.js``` to start program in terminal.

### Part 2. Todo app database design
A database schema for the Todo app.

Multiple ToDo lists with different purposes.
    Each list has at least one item.
    Each item can be tagged.
    Each item can be marked completed.
    There could be reminders for some items.

### Part 3. Todo app database design
Get alerts when a country has >= 10 languages. E.g. If a country X has 9 languages in the CountryLanguage table, and a user INSERTs one more row in the CountryLanguage table, then I should get an alert.
How can I achieve this ?

-- Write the necessary SQL statements for this solution and
-- Test your solution with example insert statements.