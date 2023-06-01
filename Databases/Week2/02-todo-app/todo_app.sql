-- Create database for a todo_app
create database if not exists todo_app;

use todo_app;

-- Create table todolist
create table if not exists todolist (
  id int auto_increment not null,
  name varchar(255),
  user_id int,
  -- constraints 
  primary key (id)
);

-- Create table todoitem
create table if not exists todoitem (
  id int auto_increment not null,
  name varchar(255),
  list_id int,
  completed boolean,
  reminder datetime,
  -- constraints
  primary key (id),
  foreign key (list_id) references todolist (id)
);

-- Create table tag
create table if not exists tag(
  id int auto_increment,
  name varchar(255),
  -- constraints
  primary key(id)
  );

-- create connector table
create table if not exists tagsitems (
  item_id int not null,
  tag_id int,
  -- constraints
  foreign key (item_id) references todoitem(id),
  foreign key (tag_id) references tag(id)
);

-- Inserting some data into todolist
insert into todolist (name) values
  ('Some stuff todo'),
  ('Wash Car'),
  ('Homework'),
  ('Grocery List');
;

-- Insert some data into todoitem
insert into todoitem (name, list_id, completed, reminder) values
  ('Buy bread', 3, 0, '2024-12-05 11:00:00'),
  ('Finish something', 2, 0, '2024-12-05 11:00:00'),
  ('Go for a coffee', 1, 1, null),
  ('But sneackers', 2, 1,'2024-12-05 11:00:00')
;
-- Insert some data into tag table
insert into tag (name) values
  ('Stuff'),
  ('Smth'),
  ('Nothing'),
  ('Ololo');
;

insert into tagsitems (item_id, tag_id) values
  (2, 3),
  (3, 1),
  (4, 1),
  (4, 2),
  (1, 1);
;
-- View data
show tables;
select * from tag;
select * from todoitem;
select * from todolist;
select * from user;
select * from tagsitems;
