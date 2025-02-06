create database if not exists admin_db;

use admin_db;

show tables;

create table users (
	id int primary key auto_increment,
    name varchar(50) not null,
    email varchar(20) unique not null,
    password varchar(20) not null
);

select * from users;

