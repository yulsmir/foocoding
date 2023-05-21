-- user     : 'week1',
-- password : 'week1password',
-- database : 'HR'

-- 1. Create database HR;
create database HR;

-- 2. Create table employee;
use HR;
begin;
create table employees(
  employee_id int not null auto_increment,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  -- personal_id varchar(255) not null,
  title varchar(255) not null,
  salary int not null,
  department varchar(255) not null,
  start_date date not null,
  -- constraints
  primary key(employee_id)
);

mysql> show tables;
+--------------+
| Tables_in_hr |
+--------------+
| employee     |
+--------------+
1 row in set (0.00 sec)

mysql> describe  employee;
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| employee_id | int(11)      | NO   | PRI | NULL    | auto_increment |
| first_name  | varchar(255) | NO   |     | NULL    |                |
| last_name   | varchar(255) | NO   |     | NULL    |                |
| title       | varchar(255) | NO   |     | NULL    |                |
| salary      | int(11)      | NO   |     | NULL    |                |
| department  | varchar(255) | NO   |     | NULL    |                |
| location    | varchar(255) | YES  |     | NULL    |                |
| start_date  | date         | NO   |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
8 rows in set (0.00 sec)


-- 3. Create table locations;
create table locations(
  location_id int not null auto_increment,
  country varchar(255),
  city varchar(255),
  street varchar(255),
  postal_code varchar(255),
  employee_id int,
  -- constraints
  primary key(location_id),
  foreign key(employee_id)
    references employees(employee_id)
);

-- 4. Insert 10-20 rows in each table with relevant fields. (Make sure that you have relevant relations)
insert into employees (first_name, last_name, title, salary, department, start_date) 
values 
  ('Tom', 'Tomsson', 'Sales Manager', 320000, 'Sales', '1999-12-31'), 
  ('John', 'Johnsson', 'PR Manager', 400000, 'PR', '2020-12-25'), 
  ('Simon', 'Simonsson', 'Web developer', 549345, 'Dev', '2020-11-25'), 
  ('Tim', 'Timsson', 'DevOps', 400000, 'Dev', '2020-10-25'), 
  ('Lola', 'Lolasson', 'Art Director', 234567, 'Art', '2022-01-11'), 
  ('John', 'Doe', 'Manager', 123456, 'Management', '2020-11-11'), 
  ('Simon', 'Cat', 'Sound Producer', 543216, 'Art', '2020-09-10'), 
  ('Bart', 'Simpson', 'Son of Homer', 543216, 'Simpsons', '1999-02-11'), 
  ('Lisa', 'Simpson', 'Daughter of Homer', 654765, 'Simpsons', '1999-02-11'), 
  ('Homer', 'Simpson', 'Father', 333333, 'Simpsons', '1999-02-11'),
  ('Stewie', 'Nobody Knows', 'Son', 333333, 'Family Guy', '2000-02-03')
;

mysql> select * from employee;
+-------------+------------+--------------+-------------------+--------+------------+----------+------------+
| employee_id | first_name | last_name    | title             | salary | department | location | start_date |
+-------------+------------+--------------+-------------------+--------+------------+----------+------------+
|           1 | Tom        | Tomsson      | Sales Manager     | 320000 | Sales      | NULL     | 1999-12-31 |
|           2 | John       | Johnsson     | PR Manager        | 400000 | PR         | NULL     | 2020-12-25 |
|           3 | Simon      | Simonsson    | Web developer     | 549345 | Dev        | NULL     | 2020-11-25 |
|           4 | Tim        | Timsson      | DevOps            | 400000 | Dev        | NULL     | 2020-10-25 |
|           5 | Lola       | Lolasson     | Art Director      | 234567 | Art        | NULL     | 2022-01-11 |
|           6 | John       | Doe          | Manager           | 123456 | Management | NULL     | 2020-11-11 |
|           7 | Simon      | Cat          | Sound Producer    | 543216 | Art        | NULL     | 2020-09-10 |
|           8 | Bart       | Simpson      | Son of Homer      | 543216 | Simpsons   | NULL     | 1999-02-11 |
|           9 | Lisa       | Simpson      | Daughter of Homer | 654765 | Simpsons   | NULL     | 1999-02-11 |
|          10 | Homer      | Simpson      | Father            | 333333 | Simpsons   | NULL     | 1999-02-11 |
|          11 | Stewie     | Nobody Knows | Son               | 333333 | Family Guy | NULL     | 2000-02-03 |
+-------------+------------+--------------+-------------------+--------+------------+----------+------------+
11 rows in set (0.01 sec)

insert into locations(country, city, street, postal_code, employee_id)
values
  ('Poland', 'Krakow', 'Wlodecka 16', '23456', 1),
  ('Sweden', 'Stockholm', 'Vasagatan 15', '63567', 2),
  ('Sweden', 'Gothenburg', 'Kristiansgatan 2', '43555', 3),
  ('Sweden', 'Ystad', 'Lillatorget 1', '33344', 4),
  ('Sweden', 'Kiruna', 'Storgatan 6', '66554', 5),
  ('Wonderland', 'Wondercity', 'Wonder street 888', '88888', 6),
  ('USA', 'Springfield', 'Unknown Street 13', '77777', 8),
  ('USA', 'Springfield', 'Unknown Street 13', '77777', 9),
  ('USA', 'Springfield', 'Unknown Street 13', '77777', 10),
  ('USA', 'Quahog', 'Strange street 9', '88888', 11)
;