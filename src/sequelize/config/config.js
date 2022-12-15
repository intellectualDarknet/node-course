module.exports = {
  development: {
    database: 'mydb',
    port: 5432,
    username: 'postgres',
    password: '54321',
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    port: 5432,
    password: '54321',
    database: 'mydb',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    password: '54321',
    database: 'mydb',
    port: 5432,
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnathorized: false
      }
    }
  }
}
