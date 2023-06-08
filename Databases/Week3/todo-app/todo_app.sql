-- Create database for a todo_app
create database if not exists todo_app;

use todo_app;

-- Create table user
create table if not exists user (
  id int auto_increment not null,
  name varchar(255),
  -- constraints 
  primary key (id)
);

-- Create table todolist
create table if not exists todolist (
  id int auto_increment not null,
  name varchar(255),
  user_id int,
  -- constraints 
  primary key (id),
  foreign key (user_id) references user(id)
);

-- Create table reminder for a list
create table if not exists listreminders (
  id int auto_increment not null,
  remind_at datetime,
  list_id int,
  -- constraints
  primary key (id),
  foreign key (list_id) references todolist(id)
);

-- Create table todoitem
create table if not exists todoitem (
  id int auto_increment not null,
  name varchar(255),
  list_id int,
  completed boolean,
  -- constraints
  primary key (id),
  foreign key (list_id) references todolist(id)
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

-- Insert some data into user
insert into user (name) values 
  ('user1'),
  ('user2')
;

-- Inserting some data into todolist
insert into todolist (name, user_id) values
  ('Some stuff todo', 1),
  ('Homework', 2),
  ('Simple stuff', 1),
  ('Some work', 2)
;

-- Insert some data into todoitem
insert into todoitem (name, list_id) values
  ('Buy bread', 1),
  ('Finish something', 2),
  ('Go for a coffee', 3),
  ('Buy sneackers', 4),
  ('Buy bread', 3),
  ('Finish something', 2),
  ('Go for a coffee', 1),
  ('But sneackers', 4)
;

-- Insert some data into listreminders table
insert into listreminders (remind_at, list_id) values
  ('2024-11-05 11:00:00', 1),
  ('2024-11-05 11:00:00', 2),
  ('2024-11-05 11:00:00', 3),
  ('2024-11-05 11:00:00', 4)
;

-- Insert some data into tag table
insert into tag (name) values
  ('Stuff'),
  ('Smth'),
  ('Nothing'),
  ('Ololo')
;

insert into tagsitems (item_id, tag_id) values
  (2, 3),
  (3, 1),
  (4, 1),
  (4, 2),
  (1, 1)
;
-- View data
show tables;
select * from user;
select * from tag;
select * from todoitem;
select * from todolist;
select * from tagsitems;
select * from listreminders;

-- Modify database
alter table todoitem modify column completed boolean default null;
alter table listreminders modify column remind_at datetime default null;

-- Insert more data into todoitem
insert into todoitem (name, list_id) values
  ('Buy car', 1),
  ('Buy milk', 1),
  ('Buy cat', 1),
  ('Buy potatoes', 1),
  ('Buy apartment', 1),
  ('Buy furniture', 1),
  ('Buy bicycle', 1),
  ('Buy water', 1),
  ('Buy dog', 1),
  ('Buy mirror', 1),
  ('Finish something', 2),
  ('Finish book', 2),
  ('Finish song', 2),
  ('Finish task', 2),
  ('Finish again smth', 2),
  ('Finish reading', 2),
  ('Finish watching movies', 2),
  ('Finish studies', 2),
  ('Finish bottle of water', 2),
  ('Call someone', 2),
  ('Go for a coffee', 3),
  ('Go for a walk', 3),
  ('Go for a talk', 3),
  ('Go just for a go', 3),
  ('Paint sneackers', 4),
  ('Dry fruits', 4),
  ('Play with a cat', 4)
;
