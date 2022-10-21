# Tech Blog

## Description
A CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. Follow the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Installation
From the command line, run `npm install` to install dependencies. Then, login to MySQL from the command line using `mysql -u root -p`. Next, setup the database by running `source db/schema.sql` in the command line. Exit by running `exit`. Next, run `npm run seed` in the command line to seed the database. Finally, run `npm start` to start the application locally.

## Usage
Deployed to Heroku. You can find the application at []().

## User Story
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
