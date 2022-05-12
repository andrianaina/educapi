CREATE DATABASE educ ;
user educ;

CREATE TABLE users(
    id int primary key auto_increment,
    username VARCHAR(50),
    mdp VARCHAR(50),
    type VARCHAR(10)
)

