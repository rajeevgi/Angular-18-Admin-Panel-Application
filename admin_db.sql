create database if not exists admin_db;

use admin_db;

show tables;

create table users (
	id int primary key auto_increment,
    name varchar(50) not null,
    email varchar(50) unique not null,
    password varchar(100) not null
);

create table admins (
	id int primary key auto_increment,
	username varchar(50) not null,
    password varchar(50) not null
);

drop table users;
drop table admins;

select * from users ;
select * from admins;

