require('dotenv').config();

const { DB_CLIENT, DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
module.exports = {
  development: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
    },
    migrations: {
      tableName: 'migrations'
    }
  }
};
