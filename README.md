# Overview
Trivial is a multi player trivia game based on everyone's favorite quiz show Jeopardy! It uses React, React Router and websockets to allow players to interact with eachother across multiple devices. The game serves a random question, and users race to submit the correct answer. The clues were provided from jService.io and stored in a postgreSQL database.

[Let's play!](https://trivial123.herokuapp.com/)

## Setup Instructions
```
git clone
npm install
create a new database in the terminal with the following commands
psql
CREATE DATABASE name of database;
update knexfile.js
under development change connection from postgres://localhost/slack to postgres://localhost/‘database you just created’
knex migrate:latest
knex seed:run
npm start
testing: npm run test
```
### Contributors
Keji Amos, Dave Hubertus, Kelly Miller, Jack Bevis

API Source: [jService.io](http://www.jservice.io)
