-- Create database for a todo_app
create database if not exists todo_app;

use todo_app;

-- Create table user
create table user (
  id int auto_increment not null,
  name varchar(255),
  email varchar(255) unique,
  password varchar(255),
  -- constraints
  primary key(id)
);

-- Create table todolist
create table if not exists todolist (
  id int auto_increment not null,
  name varchar(255),
  user_id int,
  -- constraints 
  primary key (id),
  foreign key (user_id) 
    references user(id)
);

-- Create table todoitem
create table if not exists todoitem(
  id int auto_increment not null,
  name varchar(255),
  list_id int,
  completed boolean,
  reminder datetime,
  tag int,
  -- constraints
  primary key (id),
  foreign key (list_id) 
    references todolist(id)
);

-- Create table tag
create table if not exists tag(
  id int auto_increment,
  item_id int,
  name varchar(255),
  -- constraints
  primary key(id),
  foreign key(item_id)
    references todoitem(id)
  );

-- Inserting some test data into user
insert into user (name, email, password) values
  ('John Doe', 'johndoe@mail.com', '6eyghug'),
  ('Mister Smith', 'mistersmith@somedomain.com', '97yighsjkvndf'),
  ('Mike Petersson', 'mikepetersson@email.com', 'edD09876rty.');

-- Inserting some test data into todolist
insert into todolist (name, user_id) values
  ('Personal Tasks', 1),
  ('Work Tasks', 1),
  ('Grocery List', 2);

-- Insert some test data into todoitem
insert into todoitem (name, list_id, completed, reminder) values
  ('Buy milk', 3, 0, null),
  ('Finish something', 2, 0, '2023-05-30 15:00:00'),
  ('Go for a coffee', 1, 1, null);

-- Insert some test data into tag table
insert into tag (item_id, name) values
  (1, 'Food'),
  (2, 'Work'),
  (3, 'Health');

-- View data
show tables;
select * from tag;
select * from todoitem;
select * from todolist;
select * from user;

-- TODO: remove the list id from the tags-table, remove the FK item_id -> todoitem(id),  and replace it with a todolist.tag depending on tag(id).

