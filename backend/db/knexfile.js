// Update with your config settings.
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const password = process.env.DB_PASSWORD;
const user = process.env.DB_USER;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "db",
      port: 5432,
      user: user,
      password: password,
      database: "template",
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
