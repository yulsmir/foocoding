-- 1. Create database for a todo_app
create database if not exists todo_app;

use todo_app;

-- 2. Create table user
create table user (
  id int auto_increment not null,
  name varchar(255),
  email varchar(255),
  password varchar(255),
  -- constraints
  primary key(id)
);

-- 3. Create table todolist
create table todolist (
  id int auto_increment not null,
  name varchar(255),
  user_id int,
  -- constraints 
  primary key (id),
  foreign key (user_id) 
    references user(id)
);

-- 4. Create table todoitem
create table todoitem(
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

-- 5. Create table tag
create table tag(
  id int auto_increment,
  item_id int,
  name varchar(255),
  -- constraints
  primary key(id),
  foreign key(item_id)
    references todoitem(id)
  );




