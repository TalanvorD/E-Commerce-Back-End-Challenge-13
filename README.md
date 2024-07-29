# E-Commerce-Back-End-Challenge-13 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

The backend of an ecommerce site utilizing Express, Postgres, Dotenv and Sequelize.


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)
- [Repository](#repository)

## Installation

Server runs from the CLI, interactions happen via API routes (GET, POST, PUT, DELETE).  Needs to have npm, express, pg, sequelize and dotenv installed.

## Usage

Log into postgres, install db/schema.sql to initialize the database, run node seeds/index.js to populate the database and finally npm run start to start the server.
After that, interact with the database via API routes using Insomnia.

There are 3 routes the user will interact with: /products, /categories and /tags. User can view all of each table or a single entry from a table.
User can also create a new entry, update an entry or delete an entry in those tables.

## License

[MIT License](https://spdx.org/licenses/MIT.html)

## Contributing

pg [https://www.postgresql.org/](https://www.postgresql.org/) to interact with the database

dotenv [https://www.dotenv.org/](https://www.dotenv.org/) to protect database and login information

express [https://expressjs.com/](https://expressjs.com/) Web framework for Node.js

sequelize [https://sequelize.org/](https://sequelize.org/) ORM to interact with Postgres

## Tests

Try/catch calling to find errors. Validates are used on sequelize models to restrict invalid inputs.

## Questions

For any questions:

Find me on [github](https://github.com/talanvord)!

Send me an [email](mailto://talanvor_divine@yahoo.com)!

## Repository

[https://github.com/TalanvorD/Employee-Tracker-CMS-Challenge-12](https://github.com/TalanvorD/E-Commerce-Back-End-Challenge-13)

## Screenshot

![screenshot](https://raw.githubusercontent.com/TalanvorD/E-Commerce-Back-End-Challenge-13/main/Ecommerce-screenshot.jpg)
