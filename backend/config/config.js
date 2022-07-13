require('dotenv').config()

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, SESSION_SECRET } = process.env;
const node_env = process.env.NODE_ENV

const config = {
    "development": {
        "db": {
            "username": DB_USERNAME,
            "password": DB_PASSWORD,
            "database": "db_dev",
            "host": DB_HOST,
            "dialect": "mysql",
            "port": DB_PORT
        },
        "SESSION_SECRET": SESSION_SECRET
    },
    "test": {
        "db": {
            "username": DB_USERNAME,
            "password": DB_PASSWORD,
            "database": "db_test",
            "host": DB_HOST,
            "dialect": "mysql",
            "port": DB_PORT
        },
        "SESSION_SECRET": SESSION_SECRET
    },
    "production": {
        "db": {
            "username": DB_USERNAME,
            "password": DB_PASSWORD,
            "database": "db_prod",
            "host": DB_HOST,
            "dialect": "mysql",
            "port": DB_PORT
        },
        "SESSION_SECRET": SESSION_SECRET
    }
}

module.exports = config[node_env]
