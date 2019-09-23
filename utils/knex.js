import 'dotenv/config';

const { DB_CLIENT, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;

const knex = require('knex')({
    client: DB_CLIENT,
    connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
    }
});

export default knex;
