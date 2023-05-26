drop database if exists HR;

-- 1. Create database HR;
create database HR;

use HR;

-- 3. Create table locations;
drop table if exists locations;
create table locations (
  id int,
  country varchar(255),
  city varchar(255),
  street varchar(255),
  postal_code varchar(255),
  -- constraints
  primary key(id)
);

-- 2. Create table employee;
drop table if exists employee;
create table employee (
  id int not null auto_increment,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  title varchar(255) not null,
  salary int not null,
  department varchar(255) not null,
  start_date date not null,
  location_id int,
  -- constraints
  primary key(id),
  foreign key(location_id)
    references locations(id)
);


-- 4. Insert 10-20 rows in each table with relevant fields. (Make sure that you have relevant relations)
insert into locations(id, country, city, street, postal_code)
values
  (1, 'Poland', 'Krakow', 'Wlodecka 16', '23456'),
  (2, 'Sweden', 'Stockholm', 'Vasagatan 15', '63567'),
  (3, 'Sweden', 'Gothenburg', 'Kristiansgatan 2', '43555'),
  (4, 'Sweden', 'Ystad', 'Lillatorget 1', '33344'),
  (5, 'Sweden', 'Kiruna', 'Storgatan 6', '66554'),
  (6, 'Wonderland', 'Wondercity', 'Wonder street 888', '88888'),
  (7, 'Simon Country', 'Simon City', 'Simon Street', '55555'),
  (8, 'USA', 'Springfield', 'Unknown Street 13', '77777'),
  (9, 'USA', 'Quahog', 'Strange street 9', '88888')
;

insert into employee (first_name, last_name, title, salary, department, start_date, location_id) 
values 
  ('Tom', 'Tomsson', 'Sales Manager', 320000, 'Sales', '1999-12-31', 1), 
  ('John', 'Johnsson', 'PR Manager', 400000, 'PR', '2020-12-25', 2), 
  ('Simon', 'Simonsson', 'Web developer', 549345, 'Dev', '2020-11-25', 3), 
  ('Tim', 'Timsson', 'DevOps', 400000, 'Dev', '2020-10-25', 4), 
  ('Lola', 'Lolasson', 'Art Director', 234567, 'Art', '2022-01-11', 5), 
  ('John', 'Doe', 'Manager', 123456, 'Management', '2020-11-11', 6), 
  ('Simon', 'Cat', 'Sound Producer', 543216, 'Art', '2020-09-10', 7), 
  ('Bart', 'Simpson', 'Son of Homer', 543216, 'Simpsons', '1999-02-11', 8), 
  ('Lisa', 'Simpson', 'Daughter of Homer', 654765, 'Simpsons', '1999-02-11', 8), 
  ('Homer', 'Simpson', 'Father', 333333, 'Simpsons', '1999-02-11', 8),
  ('Stewie', 'Nobody Knows', 'Son', 333333, 'Family Guy', '2000-02-03', 9)
;


show tables;

describe locations;
describe employee;

select * from employee;
select * from locations;
