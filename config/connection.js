const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) { // If DB_URL exists configure Sequelize using that
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize( // Otherwise configure Sequelize manually
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    }
  );
}

module.exports = sequelize;